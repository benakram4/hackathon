"use client";

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { ChevronLeft } from "lucide-react";

import {
	type OffKnowledgePanelData,
	defaultOffData,
	extractNutritionAndSustainabilityData,
	getOffDataByUpc,
	offDataMapAtom,
} from "@/atoms/off-data";
import { Button } from "@/components/ui/button";
import { getWalmartItem } from "@/lib/walmart/api";
import { getOffClient } from "@/providers/get-off-client";
import { type WalmartItem } from "@/types";

import { NutritionNotAvailable } from "./components/nutrition-not-available";
import { NutritionSection } from "./components/nutrition-section";
import { ProductDetailsSkeleton } from "./components/product-details-skeleton";
import { ProductHeader } from "./components/product-header";
import { ProductImage } from "./components/product-image";

const SingleProduct = ({ upc }: { upc: string }) => {
	const { data, isLoading, error } = useQuery<{ items: WalmartItem[] }>({
		queryKey: ["item", upc],
		queryFn: () => getWalmartItem(upc),
	});

	const offDataMap = useAtomValue(offDataMapAtom);
	const offData = getOffDataByUpc(offDataMap, upc);

	const offClient = getOffClient();
	const { data: fetchedOffData, isLoading: isLoadingOffData } =
		useQuery<OffKnowledgePanelData>({
			// eslint-disable-next-line @tanstack/query/exhaustive-deps
			queryKey: ["off", upc],
			queryFn: async () => {
				if (offData) return offData;
				try {
					const result = await offClient.getProductKnowledgePanels(upc);
					return result || defaultOffData; // Return default if the API returns undefined
				} catch (error) {
					console.error("Error fetching OFF data:", error);
					return defaultOffData; // Return default on error
				}
			},
			enabled: !!upc && !offData,
		});

	const combinedOffData = offData || fetchedOffData;
	const nutritionData = extractNutritionAndSustainabilityData(combinedOffData);

	if (isLoading) {
		return <ProductDetailsSkeleton />;
	}

	if (
		error ||
		!data ||
		!data.items ||
		data.items.length === 0 ||
		data.items[0] === null
	) {
		return (
			<div className="p-8 text-center">Failed to load product details</div>
		);
	}

	const item = data.items[0];

	return (
		<div className="flex min-h-screen flex-col">
			<main className="container mx-auto flex-1 px-4 py-8">
				<div className="mb-6">
					<Button variant="ghost" asChild className="mb-4">
						<Link href="/products" className="flex items-center">
							<ChevronLeft className="mr-1 h-4 w-4" />
							Back to Products
						</Link>
					</Button>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						{/* Product Image */}
						<ProductImage item={item} combinedOffData={combinedOffData} />

						{/* Product Details */}
						<ProductHeader item={item} />
					</div>
				</div>

				{/* Nutrition Information */}
				{nutritionData.hasNutritionData ? (
					<NutritionSection
						nutritionData={nutritionData}
						combinedOffData={combinedOffData}
					/>
				) : (
					<NutritionNotAvailable />
				)}
			</main>
		</div>
	);
};

export default SingleProduct;
