"use client";

import { useEffect, useState } from "react";

import { type SearchResponse } from "@/types";

export default function SwapPage() {
	const [walmartItem, setWalmartItem] = useState<SearchResponse | undefined>(
		undefined,
	);
	const [offWalmartItem, setOffWalmartItem] = useState(undefined);
	const [offSwapItems, setOffSwapItems] = useState([]);

	useEffect(() => {
		const fetchWalmartItems = async () => {
			try {
				const response = await fetch("/api/walmart/search?query=coca cola");
				const data = (await response.json()) as SearchResponse;
				setWalmartItem(data);
			} catch (error) {
				console.error("Error fetching Walmart items:", error);
			}
		};

		void fetchWalmartItems();
	}, []);

	useEffect(() => {
		if (!walmartItem?.items?.length) return;

		const fetchOffWalmartItems = async () => {
			try {
				const upc = walmartItem.items[0]?.upc;
				if (!upc) return;

				const response = await fetch(`/api/off/item?barcode=${upc}`);
				const data = await response.json();
				console.log("offWalmartItem", data);
				setOffWalmartItem(data);
			} catch (error) {
				console.error("Error fetching Open Food Facts items:", error);
			}
		};

		void fetchOffWalmartItems();
	}, [walmartItem]);

	return (
		<div className="container flex flex-col items-center justify-center gap-4 py-6">
			<h1 className="text-3xl font-bold">Swap Page - test page </h1>
			<p className="text-muted-foreground">
				This is the swap page where you can swap items.
			</p>
			{/* Add your swap functionality here */}
			{walmartItem && (
				<div>
					<p>Walmart product_name_en: {walmartItem.items[0]?.name}</p>
					<p>Walmart UPC:{walmartItem.items[0]?.upc}</p>
				</div>
			)}
			{offWalmartItem && (
				<div>
					<p>OFF product_name_en:{offWalmartItem.product_name_en}</p>
					<p>OFF categories{offWalmartItem.categories}</p>
					<p>OFF compared_to_category{offWalmartItem.compared_to_category}</p>
					<p>OFF nova_group:{offWalmartItem.nova_group}</p>
					<p>
						OFF nutrient_levels:{JSON.stringify(offWalmartItem.nutrient_levels)}
					</p>
					<p>OFF nutriscore grade:{offWalmartItem?.nutriscore_grade}</p>
					<p>OFF nutriscore score:{offWalmartItem?.nutriscore_score}</p>
				</div>
			)}
			{/* Add your swap items here */}
		</div>
	);
}
