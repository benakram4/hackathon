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
export const getFilteredEcoProducts = (products: offItem[]) => {
	// remove products with no ecoscore
	const filteredProducts = products.filter((product) => product.ecoscore_score);

	if (!filteredProducts) {
		return [];
	}

	// sort products by ecoscore
	// @ts-expect-error we are making sure ecoscore_score existence
	return filteredProducts.sort((a, b) => b.ecoscore_score - a.ecoscore_score);
};
