import { NextResponse } from "next/server";

import { generateWalmartHeaders } from "@/lib/walmart-signature";
import { type WalmartItemsResponse } from "@/types";

export async function GET() {
	try {
		const consumerId = process.env.WALMART_CONSUMER_ID || "";
		const privateKeyVersion = process.env.WALMART_KEY_VERSION || "";
		const privateKeyPem = process.env.WALMART_PRIVATE_KEY || "";

		const headers = generateWalmartHeaders(
			consumerId,
			privateKeyVersion,
			privateKeyPem,
		);

		const response = await fetch(
			"https://developer.api.walmart.com/api-proxy/service/affil/product/v2/paginated/items?category=976759&soldByWmt=true",
			{
				method: "GET",
				headers,
			},
		);

		const data: WalmartItemsResponse = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching items:", error);
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
