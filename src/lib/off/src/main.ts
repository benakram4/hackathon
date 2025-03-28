import createClient from "openapi-fetch";

import { USER_AGENT } from "./consts";
import { Robotoff } from "./robotoff";
import {
	type components as componentsv2,
	type external as externalv2,
	type paths as pathsv2,
} from "./schemas/server/v2";
import { TAXONOMY_URL } from "./taxonomy/api";
import {
	type Additive,
	type Allergen,
	type Brand,
	type Category,
	type Country,
	type Ingredient,
	type Label,
	type Language,
	type State,
	type Store,
	type TaxoNode,
	type Taxonomy,
} from "./taxonomy/types";

export type ProductV2 = componentsv2["schemas"]["Product"];
export type SearchResultV2 = externalv2["responses/search_for_products.yaml"];

// By default, use v2
export type { ProductV2 as Product, SearchResultV2 as SearchResult };

export * from "./folksonomy";
export * from "./nutripatrol";
export * from "./prices";
export * from "./robotoff";
export * from "./taxonomy/types";

export type OpenFoodFactsOptions = { country: string };

/** Wrapper of OFF API */
class OpenFoodFacts {
	private readonly fetch: typeof global.fetch;
	private readonly baseUrl: string;

	/** Raw v2 client */
	readonly rawv2: ReturnType<typeof createClient<pathsv2>>;

	/** Robotoff API */
	readonly robotoff: Robotoff;

	/**
	 * Create OFF object
	 * @param options - Options for the OFF Object
	 */
	constructor(
		fetch: typeof global.fetch,
		options: OpenFoodFactsOptions = { country: "world" },
	) {
		// TODO change to .org in production
		this.baseUrl = `https://${options.country}.openfoodfacts.net`;
		this.fetch = fetch;

		this.rawv2 = createClient<pathsv2>({
			fetch: this.fetch,
			baseUrl: this.baseUrl,
			headers: {
				// when deployed, use the the logged in user as the user agent
				"User-Agent": USER_AGENT,
			},
		});

		this.robotoff = new Robotoff(fetch);
	}

	private async getTaxoEntry<T extends TaxoNode>(
		taxo: string,
		entry: string,
	): Promise<T> {
		const res = await fetch(
			`${this.baseUrl}/api/v2/taxonomy?tagtype=${taxo}&tags=${entry}`,
			{ headers: { "User-Agent": USER_AGENT } },
		);

		return (await res.json()) as T;
	}

	getBrand(brandName: string): Promise<Brand> {
		return this.getTaxoEntry("brands", brandName);
	}

	getLanguage(languageName: string): Promise<Language> {
		return this.getTaxoEntry("languages", languageName);
	}

	getBrands(): Promise<Taxonomy<Brand>> {
		return this.getTaxo<Brand>("brands");
	}
	getLanguages(): Promise<Taxonomy<Language>> {
		return this.getTaxo<Language>("languages");
	}
	getLabels(): Promise<Taxonomy<Label>> {
		return this.getTaxo<Label>("labels");
	}
	getAdditives(): Promise<Taxonomy<Additive>> {
		return this.getTaxo<Additive>("additives");
	}
	getAllergens(): Promise<Taxonomy<Allergen>> {
		return this.getTaxo<Allergen>("allergens");
	}
	getCategories(): Promise<Taxonomy<Category>> {
		return this.getTaxo<Category>("categories");
	}
	getCountries(): Promise<Taxonomy<Country>> {
		return this.getTaxo<Country>("countries");
	}
	getIngredients(): Promise<Taxonomy<Ingredient>> {
		return this.getTaxo<Ingredient>("ingredients");
	}
	getPackagings(): Promise<Taxonomy<Ingredient>> {
		return this.getTaxo<Ingredient>("packaging");
	}
	getStates(): Promise<Taxonomy<State>> {
		return this.getTaxo<State>("states");
	}
	getStores(): Promise<Taxonomy<Store>> {
		return this.getTaxo<Store>("stores");
	}

	async getTaxo<T extends TaxoNode>(taxo: string): Promise<Taxonomy<T>> {
		const res = await this.fetch(TAXONOMY_URL(taxo));
		return (await res.json()) as Taxonomy<T>;
	}

	/**
	 * It is used to get a specific product using barcode
	 * @param barcode Barcode of the product you want to fetch details
	 */
	async getProduct(barcode: string): Promise<ProductV2 | undefined> {
		const res = await this.rawv2.GET("/api/v2/product/{barcode}", {
			params: { path: { barcode } },
		});

		return res.data;
	}

	/**
	 * Author: Ben Akram
	 * Get Knowledge panels for a specific product by barcode
	 * @description Knowledge panels gives high level information about a product,
	 * ready to display. This is used by the Open Food Facts website
	 * and by the official mobile application.
	 * @param barcode Barcode of the product you want to fetch knowledge panels for
	 */
	async getProductKnowledgePanels(barcode: string) {
		const res = await this.rawv2.GET("/api/v2/product/{barcode}", {
			params: {
				path: { barcode },
				query: { fields: "knowledge_panels" },
			},
		});

		return res.data;
	}

	async performOCR(
		barcode: string,
		photoId: string,
		ocrEngine: "google_cloud_vision" = "google_cloud_vision",
	): Promise<{ status?: number } | undefined> {
		const res = await this.rawv2.GET("/cgi/ingredients.pl", {
			params: {
				query: {
					code: barcode,
					id: photoId,
					ocr_engine: ocrEngine,
					process_image: "1",
				},
			},
		});

		return res.data;
	}

	async getProductImages(barcode: string): Promise<string[] | null> {
		const res = await this.rawv2.GET("/api/v2/product/{barcode}", {
			params: {
				query: {
					fields: "images",
				},
				path: { barcode },
			},
		});

		if (!res.data?.product) {
			return null;
		} else if (!res.data?.product?.images) {
			return null;
		}

		const imgObj = res.data?.product?.images;
		return Object.keys(imgObj);
	}

	async search(
		fields?: string,
		sortBy?: componentsv2["parameters"]["sort_by"],
		filters?: Record<string, string | number>,
	): Promise<SearchResultV2 | undefined> {
		const res = await this.rawv2.GET("/api/v2/search", {
			params: { query: { fields, sort_by: sortBy, ...filters } },
		});

		return res.data;
	}
}

export default OpenFoodFacts;
