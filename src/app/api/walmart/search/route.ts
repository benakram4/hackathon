import { type NextRequest, NextResponse } from "next/server";

import { generateWalmartHeaders } from "@/lib/walmart-signature";
import { type SearchResponse } from "@/types";

export async function GET(
	request: NextRequest,
): Promise<NextResponse<SearchResponse>> {
	try {
		const consumerId = process.env.WALMART_CONSUMER_ID || "";
		const privateKeyVersion = process.env.WALMART_KEY_VERSION || "";
		const privateKeyPem = process.env.WALMART_PRIVATE_KEY || "";

		const { searchParams } = new URL(request.url);

		// Extract query parameters
		const query = searchParams.get("query");
		const categoryId = searchParams.get("categoryId");
		const start = searchParams.get("start");
		const sort = searchParams.get("sort");
		const order = searchParams.get("order");
		const numItems = searchParams.get("numItems");
		const responseGroup = searchParams.get("responseGroup");
		const facet = searchParams.get("facet");
		const facetFilter = searchParams.get("facet.filter");
		const facetRange = searchParams.get("facet.range");

		// Build the URL
		let url = `https://developer.api.walmart.com/api-proxy/service/affil/product/v2/search?query=${query}`;

		if (categoryId) {
			url += `&categoryId=${categoryId}`;
		}
		if (start) {
			url += `&start=${start}`;
		}
		if (sort) {
			url += `&sort=${sort}`;
		}
		if (order) {
			url += `&order=${order}`;
		}
		if (numItems) {
			url += `&numItems=${numItems}`;
		}
		if (responseGroup) {
			url += `&responseGroup=${responseGroup}`;
		}
		if (facet) {
			url += `&facet=${facet}`;
		}
		if (facetFilter) {
			url += `&facet.filter=${facetFilter}`;
		}
		if (facetRange) {
			url += `&facet.range=${facetRange}`;
		}

		const headers = generateWalmartHeaders(
			consumerId,
			privateKeyVersion,
			privateKeyPem,
		);

		const response = await fetch(url, {
			method: "GET",
			headers,
		});

		const data = (await response.json()) as SearchResponse;
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching items:", error);
		return NextResponse.json(
			{
				query: "",
				sort: "",
				responseGroup: "",
				totalResults: 0,
				start: 0,
				numItems: 0,
				items: [],
				facets: [],
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}
