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
					// // not necessarily an error, just no data eg 404
					// alert("Product not found in Open Food Facts. Please check the UPC.");
					// console.error("Error fetching OFF data:", error);
					return defaultOffData; // Return default on error
				}
			},
			enabled: !!upc && !offData,
			retry: false,
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
			<div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
				<div className="mb-6 rounded-full bg-amber-100 p-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="h-8 w-8 text-amber-600">
						<circle cx="12" cy="12" r="10" />
						<line x1="12" y1="8" x2="12" y2="12" />
						<line x1="12" y1="16" x2="12.01" y2="16" />
					</svg>
				</div>
				<h2 className="mb-2 text-2xl font-bold text-gray-800">
					Product Unavailable
				</h2>
				<p className="mb-6 max-w-md text-gray-600">
					This item is currently unavailable from the supplier. Please try again
					later or browse other products.
				</p>
				<Button asChild>
					<Link href="/products" className="flex items-center gap-2">
						<ChevronLeft className="h-4 w-4" />
						Back to Products
					</Link>
				</Button>
			</div>
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
