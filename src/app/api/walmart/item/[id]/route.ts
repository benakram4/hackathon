import { NextResponse } from "next/server";

import { getWalmartApiHeaders } from "@/lib/walmart-signature";
import { type WalmartItem } from "@/types";

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

		const headers = getWalmartApiHeaders();

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

		const data = (await response.json()) as WalmartItem;
		return NextResponse.json(data);
	} catch (error) {
		console.error(`Error fetching item:`, error);
		return NextResponse.json({ error }, { status: 500 });
	}
}
