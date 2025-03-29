import type OpenFoodFacts from "./off/src/main";
import { type ProductV2 as offItem } from "./off/src/main";

// get category to search for, from heirarchy
export const getSpecificCategory = (categories: string[]) => {
	const filtered = categories
		.filter((category) => !category.trim().includes("fr:"))
		.map((category) => category.trim());

	if (!filtered.length) {
		return "";
	}

	return filtered[filtered.length - 1];
};

// sort and filter products based on ecoscore
export const getFilteredAndSortedEcoProducts = (products: offItem[]) => {
	// remove products with no ecoscore
	const filteredProducts = products.filter(
		// @ts-expect-error that's the check lol
		(product) => product.environmental_score_score,
	);

	if (!filteredProducts) {
		return [];
	}

	// sort products by ecoscore
	return filteredProducts.sort(
		// @ts-expect-error we are making sure environmental_score_score existence
		(a, b) => b.environmental_score_score - a.environmental_score_score,
	);
};

// filter product based on nitriscore field presence
export const getFilteredNutriProducts = (products: offItem[]) => {
	// remove products with no ecoscore
	const filteredProducts = products.filter(
		(product) => product.nutriscore_score,
	);

	if (!filteredProducts) {
		return [];
	}

	return filteredProducts;
};

// polling off api to get all products since there is api max limit of 100 products at a time
type sortByAcceptables =
	| "product_name"
	| "last_modified_t"
	| "scans_n"
	| "unique_scans_n"
	| "created_t"
	| "completeness"
	| "popularity_key"
	| "nutriscore_score"
	| "nova_score"
	| "nothing"
	| "ecoscore_score";

export async function pollOffApi({
	offClient,
	fields,
	sortBy,
	category,
	limiter = 10,
}: {
	offClient: OpenFoodFacts;
	fields: string;
	sortBy: sortByAcceptables;
	category: string;
	limiter?: number;
}) {
	let page = 1;
	const allProducts = [];

	// Polling logic
	while (true) {
		const response = await offClient.search(fields, sortBy, {
			page,
			page_size: 100,
			categories_tags: category,
		});

		const data = response;

		if (!data?.products || data.products.length === 0) {
			console.log(`No more products found on page ${page}.`);
			break;
		}

		allProducts.push(...data.products);
		page++;

		if (page > limiter) {
			console.log("Reached limiter");
			break;
		}
	}

	if (!allProducts.length) {
		throw new Error("No products found");
	}

	return allProducts;
}
