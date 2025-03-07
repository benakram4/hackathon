import { NextResponse } from "next/server";

import { generateWalmartHeaders } from "@/lib/walmart-signature";

// TODO Just for testing, if we need this data this should be done in server component
export async function GET() {
	try {
		const consumerId = process.env.WALMART_CONSUMER_ID || "";
		const privateKeyVersion = process.env.WALMART_KEY_VERSION || "";
		const privateKeyPem = process.env.WALMART_PRIVATE_KEY || "";

		console.log("privateKeyPem", privateKeyPem);

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

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching categories:", error);
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
