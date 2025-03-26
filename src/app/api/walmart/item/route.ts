import { NextResponse } from "next/server";

import { generateWalmartHeaders } from "@/lib/walmart-signature";
import { type WalmartItemsResponse } from "@/types";

export async function GET(req: Request) {
	try {
		const consumerId = process.env.WALMART_CONSUMER_ID || "";
		const privateKeyVersion = process.env.WALMART_KEY_VERSION || "";
		const privateKeyPem = process.env.WALMART_PRIVATE_KEY || "";

		const headers = generateWalmartHeaders(
			consumerId,
			privateKeyVersion,
			privateKeyPem,
		);

		const params = new URL(req.url).searchParams;
		const upc = params.get("upc");

		if (!upc) {
			console.error("UPC Param not provided or invalid");
			return NextResponse.json(
				{ error: "UPC param is required" },
				{ status: 400 },
			);
		}

		const response = await fetch(
			`https://developer.api.walmart.com/api-proxy/service/affil/product/v2/items?upc=${upc}`,
			{
				method: "GET",
				headers,
			},
		);

		const data: WalmartItemsResponse = await response.json();

		if (!data) {
			console.error("No Items Found");
			return NextResponse.json({ error: "Items not found" }, { status: 404 });
		}

		const item = data.items[0];
		return NextResponse.json(item);
	} catch (error) {
		console.error("Error fetching items:", error);
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
