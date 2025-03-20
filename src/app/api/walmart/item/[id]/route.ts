import { NextResponse } from "next/server";

import { generateWalmartHeaders } from "@/lib/walmart-signature";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{ error: "Item ID is required" },
				{ status: 400 },
			);
		}

		const consumerId = process.env.WALMART_CONSUMER_ID || "";
		const privateKeyVersion = process.env.WALMART_KEY_VERSION || "";
		const privateKeyPem = process.env.WALMART_PRIVATE_KEY || "";

		const headers = generateWalmartHeaders(
			consumerId,
			privateKeyVersion,
			privateKeyPem,
		);

		const response = await fetch(
			`https://developer.api.walmart.com/api-proxy/service/affil/product/v2/items/${id}`,
			{
				method: "GET",
				headers,
			},
		);

		if (!response.ok) {
			return NextResponse.json(
				{ error: `Failed to fetch item with ID: ${id}` },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error(`Error fetching item:`, error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
