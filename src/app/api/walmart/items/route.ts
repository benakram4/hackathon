import { NextResponse } from "next/server";

import { getWalmartApiHeaders } from "@/lib/walmart-signature";
import { RELEVANT_FOOD_SUBCATEGORIES } from "@/lib/walmart/constants";
import { type WalmartItem, type WalmartItemsResponse } from "@/types";

// Helper function to fetch items for a single category
async function fetchItemsForCategory(
	category: string,
): Promise<WalmartItemsResponse> {
	const headers = getWalmartApiHeaders();

	const response = await fetch(
		`https://developer.api.walmart.com/api-proxy/service/affil/product/v2/paginated/items?category=${category}&count=400&soldByWmt=true`,
		{
			method: "GET",
			headers,
		},
	);

	if (!response.ok) {
		throw new Error(
			`Walmart API responded with status: ${response.status} for category: ${category}`,
		);
	}

	return response.json() as Promise<WalmartItemsResponse>;
}

export async function GET(): Promise<
	NextResponse<WalmartItem[] | { error: unknown }>
> {
	try {
		// Get all category IDs
		const categoryIds = Object.keys(RELEVANT_FOOD_SUBCATEGORIES);

		// Fetch items for all categories concurrently
		const categoryResults = await Promise.all(
			categoryIds.map((categoryId) => fetchItemsForCategory(categoryId)),
		);

		// Extract and flatten all items from each category
		const allItems = categoryResults.flatMap((result) => result.items || []);
		return NextResponse.json(allItems);
	} catch (error) {
		console.error("Error fetching items:", error);
		return NextResponse.json({ error }, { status: 500 });
	}
}
