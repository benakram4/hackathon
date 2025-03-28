import { getSpecificCategory } from "@/lib/off-logic";
import { type ProductV2 as offItemType } from "@/lib/off/src/main";

// fetch exact walmart item from off api
export const fetchOffWalmartItems = async (upc: string) => {
	try {
		const response = await fetch(`/api/off/item?barcode=${upc}`);
		const data = await response.json();

		if (!data) {
			return null;
		}

		console.log("Walmart item from OFF: ", data.product);
		return data.product;
	} catch (error) {
		console.error("Error fetching Open Food Facts items:", error);
		throw new Error(`Error fetching Open Food Facts items`);
	}
};

// fetch similar but with highest eco score product from off api
export const fetchOffSwapItem = async (
	item: offItemType,
	swapPreference: string,
) => {
	try {
		console.log(`SWAP PREFERENCE: ${swapPreference}`);
		// we need categorical_hierarchy for getting similar set of products
		if (!item?.categories_hierarchy) {
			console.warn(
				`No hierarchical category found for product ${item?.product_name_en ?? "UNKNOWN"} for swapping`,
			);
			return null;
		}

		const specificCategory = getSpecificCategory(item.categories_hierarchy);

		if (!specificCategory) {
			console.warn(
				`No specific category found after filtration for product ${
					item.product_name ?? "UNKNOWN"
				} for swapping`,
			);
			return null;
		}

		console.log("SPECIFIC CAT: ", specificCategory);

		let response: Response | null = null;

		if (swapPreference == "sustainable") {
			response = await fetch(
				`/api/off/high-eco-items?category=${specificCategory}`,
			);
		} else if (swapPreference == "healthier") {
			response = await fetch(
				`/api/off/healthier-items?category=${specificCategory}`,
			);
		} else {
			console.warn(
				`Selected swap preference seem to be ${
					swapPreference ?? "UNKNOWN"
				} for swapping`,
			);
			return null;
		}

		if (!response.ok || !response) {
			console.warn(`No similar product found, look at logs for more info!`);
			return null;
		}

		const data = await response.json();

		if (!data) {
			console.warn("No data received from the API.");
			return null;
		}

		return data;
	} catch (error) {
		console.error("Error fetching Open Food Facts items:", error);
		throw new Error(`Error fetching Open Food Facts items`);
	}
};
