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
export const fetchOffSwapItem = async (item: offItemType) => {
	try {
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

		const response = await fetch(
			`/api/off/high-eco-items?category=${specificCategory}`,
		);

		if (response.status === 404) {
			console.warn(`No similar product found, look at logs for more info!`);
			return null;
		}

		const data = await response.json();

		if (!data) {
			return null;
		}

		return data;
	} catch (error) {
		console.error("Error fetching Open Food Facts items:", error);
		throw new Error(`Error fetching Open Food Facts items`);
	}
};
