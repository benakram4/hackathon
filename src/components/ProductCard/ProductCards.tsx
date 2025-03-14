"use client";

import { useQuery } from "@tanstack/react-query";

import { getItems } from "@/app/products/page";
import { WalmartItem, WalmartItemsResponse } from "@/types/walmart";

import ProductCard from "./ProductCard";

export default function ProductCards() {
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
