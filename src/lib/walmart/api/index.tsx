import { RELEVANT_FOOD_SUBCATEGORIES } from "@/lib/walmart/constants";
import { type WalmartItem } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_PROD_URL || "http://localhost:3000";

export async function getWalmartItems(): Promise<WalmartItem[]> {
	const response = await fetch(`${baseUrl}/api/walmart/items`, {
		method: "GET",
	});
	if (!response.ok) {
		throw new Error(
			`Failed to fetch items: ${response.status} ${response.statusText}`,
		);
	}
	return await response.json();
}

export async function getWalmartItem(
	upc: string,
): Promise<{ items: WalmartItem[] }> {
	const response = await fetch(`${baseUrl}/api/walmart/item/${upc}`, {
		method: "GET",
	});

	if (!response.ok) {
		throw new Error(
			`Failed to fetch item with ID: ${upc} - Status: ${response.status}`,
		);
	}

	return await response.json();
}

export async function getWalmartItemsByCategory(
	categoryId: string,
): Promise<WalmartItem[]> {
	const response = await fetch(
		`${baseUrl}/api/walmart/items/category/${categoryId}`,
		{
			method: "GET",
		},
	);

	if (!response.ok) {
		throw new Error(
			`Failed to fetch items for category ${categoryId}: ${response.status} ${response.statusText}`,
		);
	}

	return await response.json();
}

export function getAllCategoryIds(): string[] {
	return Object.keys(RELEVANT_FOOD_SUBCATEGORIES);
}
