import { NextResponse } from "next/server";

import { generateWalmartHeaders } from "@/lib/walmart-signature";
import { RELEVANT_CATEGORIES } from "@/lib/walmart/constants";
import { WalmartCategoriesResponse } from "@/types";

export async function GET() {
	try {
		const consumerId = process.env.WALMART_CONSUMER_ID || "";
		const privateKeyVersion = process.env.WALMART_KEY_VERSION || "";
		const privateKeyPem = process.env.WALMART_PRIVATE_KEY || "";

		const headers = generateWalmartHeaders(
			consumerId,
			privateKeyVersion,
			privateKeyPem
		);

		const response = await fetch(
			"https://developer.api.walmart.com/api-proxy/service/affil/product/v2/taxonomy",
			{
				method: "GET",
				headers,
			}
		);

		const data: WalmartCategoriesResponse = await response.json();
		const filteredCategories = data.categories.filter(
			(category) => category && Object.hasOwn(RELEVANT_CATEGORIES, category.id)
		);
		return NextResponse.json(filteredCategories);
	} catch (error) {
		console.error("Error fetching categories:", error);
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
