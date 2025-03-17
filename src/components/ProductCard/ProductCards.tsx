"use client";

import { useQuery } from "@tanstack/react-query";

import { WalmartItem, WalmartItemsResponse } from "@/types/walmart";

import ProductCard from "./ProductCard";

const baseUrl = process.env.NEXT_PUBLIC_PROD_URL || "http://localhost:3000";

export default function ProductCards() {
	async function getItems(): Promise<WalmartItemsResponse> {
		const response = await fetch(`${baseUrl}/api/walmart/items`, {
			method: "GET",
		});
		if (!response.ok) {
			throw new Error("Failed to fetch items");
		}
		const data: WalmartItemsResponse = await response.json();

		// console.log(`Fetched itemss: ${JSON.stringify(data)}`);
		return data;
	}

	const { data, error, isLoading } = useQuery<WalmartItemsResponse>({
		queryKey: ["items"],
		queryFn: getItems,
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="container mx-auto p-4">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{data?.items.map((product: WalmartItem) => (
					<ProductCard key={product.itemId} product={product} />
				))}
			</div>
		</div>
	);
}
