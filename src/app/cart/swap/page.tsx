"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { getSpecificCategory } from "@/lib/off-logic";
import OpenFoodFacts, { type ProductV2 as offItem } from "@/lib/off/src/main";
import { type SearchResponse } from "@/types";

export default function SwapPage() {
	const [walmartItem, setWalmartItem] = useState<SearchResponse | undefined>(
		undefined,
	);
	const [offWalmartItem, setOffWalmartItem] = useState<offItem | undefined>(
		undefined,
	);
	const [offSwapItems, setOffSwapItems] = useState<offItem | undefined>(
		undefined,
	);

	useEffect(() => {
		const fetchWalmartItems = async () => {
			try {
				const response = await fetch(
					"/api/walmart/search?query='NUTELLA® Hazelnut Spread'",
				);
				const data = (await response.json()) as SearchResponse;
				setWalmartItem(data);
			} catch (error) {
				console.error("Error fetching Walmart items:", error);
			}
		};

		void fetchWalmartItems();
	}, []);

	const fetchOffWalmartItems = async (upc: string) => {
		try {
			const response = await fetch(`/api/off/item?barcode=${upc}`);
			const data = await response.json();
			console.log("offWalmartItem", data);
			setOffWalmartItem(data);
		} catch (error) {
			console.error("Error fetching Open Food Facts items:", error);
		}
	};

	useEffect(() => {
		if (!offWalmartItem) return;

		const fetchOffSwapItems = async () => {
			try {
				// we need categorical hierarchy for getting similar and specific products
				if (!offWalmartItem.categories_hierarchy) {
					alert("No categories_hierarchy found");
				}
				const specificCategory = getSpecificCategory(
					offWalmartItem.categories_hierarchy!,
				);

				console.log("specificCategory", specificCategory);

				const response = await fetch(
					`/api/off/high-eco-items?category=${specificCategory}`,
				);

				if (response.status === 404) {
					alert("No similar product found");
					return;
				}

				const data = await response.json();

				setOffSwapItems(data);
			} catch (error) {
				console.error("Error fetching Open Food Facts items:", error);
			}
		};

		void fetchOffSwapItems();
	}, [offWalmartItem]);

	const swapItems = () => {
		console.log("Swap button clicked");

		if (!walmartItem?.items[0]) {
			alert("No items found in Walmart");
			return;
		}

		void fetchOffWalmartItems(walmartItem?.items[0]?.upc);
	};

	useEffect(() => {
		if (!offWalmartItem?.categories) return;
		const fetchOffSwapItems = async () => {
			const off = new OpenFoodFacts(fetch, { country: "ca" });
			try {
				const product = await off.search("", "nutriscore_score", {
					categories: "Mayonnaises",
				});
				console.log(`fetchOffSwapItems: ${JSON.stringify(product)}`);
				setOffSwapItems(product);
			} catch (error) {
				console.error("Error fetching Open Food Facts items:", error);
			}
		};
		void fetchOffSwapItems();
	}, [offWalmartItem?.categories]);

	return (
		<div className="container flex flex-col items-center justify-center gap-4 py-6">
			<h1 className="text-3xl font-bold">Swap Page - test page </h1>
			<p className="text-muted-foreground">
				This is the swap page where you can swap items.
			</p>
			{/* Add your swap functionality here */}
			{walmartItem && (
				<div className="flex flex-col gap-2 border-2 p-4">
					<p>
						<span className="font-bold">Walmart product_name_en:</span>
						{walmartItem.items[0]?.name}
					</p>
					<p>
						<span className="font-bold">Walmart UPC:</span>
						{walmartItem.items[0]?.upc}
					</p>

					<Button onClick={swapItems}>Swap</Button>
				</div>
			)}
			{offSwapItems && (
				<div>
					<p>OFF product_name_en:{offSwapItems.product_name_en}</p>
					<p>OFF categories{offSwapItems.categories}</p>
					<p>OFF compared_to_category{offSwapItems.compared_to_category}</p>
					<p>OFF ecoscore_grade:{offSwapItems.ecoscore_grade}</p>
					<p>OFF ecoscore_score:{offSwapItems.ecoscore_score}</p>
					<p>
						OFF ecoscore_score co2_total:
						{offSwapItems?.ecoscore_data?.agribalyse?.co2_total}
					</p>

					<p>OFF nova_group:{offSwapItems.nova_group}</p>
					<p>
						OFF nova_groups_markers:
						{/* {offSwapItems?.nova_groups_markers?.[offSwapItems?.nova_group] ?? "N/A"} */}
					</p>

					<p>
						OFF nutrient_levels:{JSON.stringify(offSwapItems.nutrient_levels)}
					</p>
					<p>OFF nutriscore grade:{offSwapItems?.nutriscore_grade}</p>
					<p>OFF nutriscore score:{offSwapItems?.nutriscore_score}</p>
					<p>OFF image:{offSwapItems?.selected_images?.front?.display?.en}</p>
					{offSwapItems?.image_front_url && (
						<img
							src={offSwapItems?.image_front_url}
							alt="Image"
							width={500}
							height={200}
							className="rounded-lg"
						/>
					)}
					{/* // <p>OFF packaging: {offSwapItems?.packaging}</p> */}
					<p>
						OFF threatened_species:{" "}
						{JSON.stringify(
							offSwapItems?.ecoscore_data?.adjustments?.threatened_species,
						)}
					</p>
				</div>
			)}
			{/* Add your swap items here */}
		</div>
	);
}
