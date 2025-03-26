import { NextResponse } from "next/server";

import { getWalmartApiHeaders } from "@/lib/walmart-signature";
import { RELEVANT_CATEGORIES } from "@/lib/walmart/constants";
import { type WalmartCategoriesResponse } from "@/types";

export async function GET() {
	try {
		const headers = getWalmartApiHeaders();

		const response = await fetch(
			"https://developer.api.walmart.com/api-proxy/service/affil/product/v2/taxonomy",
			{
				method: "GET",
				headers,
			},
		);

		const data = (await response.json()) as WalmartCategoriesResponse;
		const filteredCategories = data.categories.filter(
			(category) => category && Object.hasOwn(RELEVANT_CATEGORIES, category.id),
		);
		return NextResponse.json(filteredCategories);
	} catch (error) {
		console.error("Error fetching categories:", error);
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
