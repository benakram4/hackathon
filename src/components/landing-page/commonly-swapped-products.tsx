"use client";

import { useMemo, useRef } from "react";

import { useQueries } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ProductCard from "@/app/products/product-card";
import { defaultOffData, offDataMapAtom } from "@/atoms/off-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getOffClient } from "@/providers/get-off-client";
import type { WalmartItem } from "@/types/walmart";

// UPCs of products we want to show - commonly swapped conventional items
const PRODUCT_UPCS = [
	"071258073658", // Griffin Pancake Syrup
	"602652171284", // KIND Nut Bars, Almond & Coconut
	"078742230375", // Great Value Spaghetti 16oz
	"013000006408", // Heinz Tomato Ketchup
	"021000615261", // Kraft Singles American Cheese Slices
	"016000170032", // Cheerios, Heart Healthy Cereal
	"190646641016", // Oatly The Original Oat Milk
];

const CommonlySwappedProducts = () => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const offClient = getOffClient();
	const setOffDataMap = useSetAtom(offDataMapAtom);
	const offDataMap = useAtomValue(offDataMapAtom);

	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const { current } = scrollContainerRef;
			const scrollAmount =
				direction === "left"
					? -current.offsetWidth / 1.5
					: current.offsetWidth / 1.5;
			current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	};

	// Fetch products from Walmart API
	const productQueries = useQueries({
		queries: PRODUCT_UPCS.map((upc) => ({
			queryKey: ["commonlySwappedProduct", upc],
			queryFn: async () => {
				const response = await fetch(`/api/walmart/item/${upc}`);
				if (!response.ok) {
					throw new Error(`Failed to fetch product with UPC: ${upc}`);
				}
				const data = (await response.json()) as { items: WalmartItem[] };
				return data;
			},
			staleTime: 60 * 60 * 1000,
			gcacheTime: 60 * 60 * 1000,
		})),
	});

	const products = useMemo(() => {
		return productQueries
			.map((query) => query.data)
			.filter((product): product is { items: WalmartItem[] } => !!product);
	}, [productQueries.map((q) => q.dataUpdatedAt).join(",")]);

	// Fetch OpenFoodFacts data for products
	const knowledgePanelQueries = useQueries({
		queries: products.map((product) => ({
			queryKey: ["knowledgePanel", product?.items[0]?.upc],
			queryFn: async () => {
				try {
					if (!product?.items[0]?.upc) return defaultOffData;
					if (offDataMap.has(product?.items[0]?.upc))
						return offDataMap.get(product?.items[0]?.upc);
					const data = await offClient.getProductKnowledgePanels(
						product?.items[0]?.upc,
					);
					if (data && product?.items[0]?.upc) {
						setOffDataMap((prev) => {
							const newMap = new Map(prev);
							newMap.set(product.items[0]!.upc, data);
							return newMap;
						});
					}
					return data || defaultOffData;
				} catch (error) {
					return defaultOffData;
				}
			},
			staleTime: 60 * 60 * 1000,
			gcacheTime: 60 * 60 * 1000,
			refetchOnWindowFocus: false,
			enabled: !!product?.items[0]?.upc,
			retry: false,
		})),
	});

	// Create a memoized map of productId -> knowledge data
	const knowledgePanelMap = useMemo(() => {
		const map = new Map();
		knowledgePanelQueries.forEach((query, index) => {
			if (products[index]) {
				map.set(products[index]?.items[0]?.itemId, query.data || null);
			}
		});
		return map;
	}, [products, knowledgePanelQueries.map((q) => q.dataUpdatedAt).join(",")]);

	const isLoading = productQueries.some((q) => q.isLoading);

	return (
		<section
			id="commonly-swapped"
			className="section-padding relative bg-white">
			<div className="container mx-auto px-4">
				<div className="mb-12 flex flex-col justify-between md:flex-row md:items-end">
					<div>
						<Badge variant="outline" className="mb-3">
							Commonly Swapped Items
						</Badge>
						<h2 className="mb-3 text-3xl font-bold md:text-4xl">
							Most Frequently <span className="text-primary">Swapped</span>{" "}
							Products
						</h2>
						<p className="text-muted-foreground max-w-2xl">
							These conventional products are most often swapped for
							eco-friendly alternatives
						</p>
					</div>
					<div className="mt-6 flex gap-2 md:mt-0">
						<Button
							variant="outline"
							size="icon"
							onClick={() => scroll("left")}
							className="h-10 w-10 rounded-full">
							<ChevronLeft className="h-5 w-5" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							onClick={() => scroll("right")}
							className="h-10 w-10 rounded-full">
							<ChevronRight className="h-5 w-5" />
						</Button>
					</div>
				</div>

				<div className="relative">
					<div className="from-background pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent" />
					<div
						ref={scrollContainerRef}
						className="hide-scrollbar flex gap-6 overflow-x-auto pb-8">
						{isLoading
							? // Loading skeletons
								Array.from({ length: 5 }).map((_, i) => (
									<div
										key={i}
										className="w-[280px] flex-shrink-0 overflow-hidden rounded-xl border bg-white">
										<div className="bg-muted/50 relative h-64 w-full">
											<Skeleton className="h-full w-full" />
										</div>
										<div className="p-4">
											<Skeleton className="h-6 w-1/2" />
											<Skeleton className="mt-2 h-4 w-3/4" />
											<Skeleton className="mt-2 h-4 w-full" />
										</div>
										<div className="border-t p-5">
											<Skeleton className="h-10 w-20" />
										</div>
									</div>
								))
							: // Real products
								products.map((product, index) =>
									product?.items[0]?.upc ? (
										<div
											key={product.items[0].upc}
											className="w-[280px] flex-shrink-0">
											<ProductCard
												product={product.items[0]}
												knowledgePanelData={knowledgePanelMap.get(
													product.items[0].itemId,
												)}
												isLoadingKnowledgePanel={
													knowledgePanelQueries?.[index]?.isLoading
												}
											/>
										</div>
									) : null,
								)}
					</div>
					<div className="from-background pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16 bg-gradient-to-l to-transparent" />
				</div>
			</div>
		</section>
	);
};

export default CommonlySwappedProducts;
