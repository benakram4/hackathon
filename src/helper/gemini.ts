import { type WalmartItem } from "@/types";

export interface LocalAlternativesResponse {
	original_product_name: string;
	product_category: string;
	isCanadian: boolean;
	alternative_product_names: string[];
}

// fetch exact walmart item from off api
export const fetchLocalAlternatives = async (product: WalmartItem) => {
	try {
		const response = await fetch(`/api/gemini?prompt=${product.name}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				prompt: product.name,
			}),
		});

		if (!response.ok) {
			console.error("Error fetching from Gemini:", response.statusText);
			return null;
		}

		const data = await response.json();

		if (!data) {
			return null;
		}

		console.log("Alternative Local products received: ", data);

		return data;
	} catch (error) {
		console.error("Error getting response from Gemini:", error);
		throw new Error(`Error fetching from Gemini API for alternative locals`);
	}
};
