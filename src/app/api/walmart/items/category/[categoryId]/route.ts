import { type NextRequest, NextResponse } from "next/server";

import { getWalmartApiHeaders } from "@/lib/walmart-signature";
import { RELEVANT_FOOD_SUBCATEGORIES } from "@/lib/walmart/constants";
import { type WalmartItem, type WalmartItemsResponse } from "@/types";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ categoryId: string }> },
): Promise<NextResponse<WalmartItem[] | { error: unknown }>> {
	const { categoryId } = await params;

	// Verify that this is a valid category ID
	if (!Object.keys(RELEVANT_FOOD_SUBCATEGORIES).includes(categoryId)) {
		return NextResponse.json(
			{ error: `Invalid category ID: ${categoryId}` },
			{ status: 400 },
		);
	}

	try {
		const headers = getWalmartApiHeaders();

		const response = await fetch(
			`https://developer.api.walmart.com/api-proxy/service/affil/product/v2/paginated/items?category=${categoryId}&count=1000&soldByWmt=true&available=true`,
			{
				method: "GET",
				headers,
			},
		);

		if (!response.ok) {
			throw new Error(
				`Walmart API responded with status: ${response.status} for category: ${categoryId}`,
			);
		}

		const data = (await response.json()) as WalmartItemsResponse;
		return NextResponse.json(data.items || []);
	} catch (error) {
		console.error(`Error fetching items for category ${categoryId}:`, error);
		return NextResponse.json({ error }, { status: 500 });
	}
}
