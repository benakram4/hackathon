"use client";

import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import {
	extractOffLogos,
	getOffDataByUpc,
	offDataMapAtom,
} from "@/atoms/off-data";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getWalmartItem } from "@/lib/walmart/api";
import { getOffClient } from "@/providers/get-off-client";
import { type WalmartItem } from "@/types";

export default function ProductDetails({ upc }: { upc: string }) {
	const { data, isLoading, error } = useQuery<{ items: WalmartItem[] }>({
		queryKey: ["item", upc],
		queryFn: () => getWalmartItem(upc),
	});

	const offDataMap = useAtomValue(offDataMapAtom);
	const offData = getOffDataByUpc(offDataMap, upc);

	// If we don't have OFF data in the atom yet, fetch it
	const offClient = getOffClient();
	const { data: fetchedOffData, isLoading: isLoadingOffData } = useQuery({
		// eslint-disable-next-line @tanstack/query/exhaustive-deps
		queryKey: ["off", upc],
		queryFn: async () => {
			if (offData) return offData;
			return await offClient.getProductKnowledgePanels(upc);
		},
		// Only fetch if we don't already have the data
		enabled: !!upc && !offData,
	});

	// Combine data from atom and freshly fetched data
	const combinedOffData = offData || fetchedOffData;
	const { nutriScoreLogo, greenScoreLogo, novaGroupLogo } =
		extractOffLogos(combinedOffData);

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
	// Extract the first item from the items array
	const item = data.items[0];
	return (
		<div className="container mx-auto p-6">
			<div className="grid gap-8 md:grid-cols-2">
				<div className="relative aspect-square rounded-lg">
					{item?.largeImage && (
						<Image
							src={item.largeImage}
							alt={item.name}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, 50vw"
							priority
						/>
					)}

					{/* OFF Scores */}
					<div className="bg-card/80 absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3 py-2 shadow-md backdrop-blur-sm">
						<Image
							src={nutriScoreLogo}
							alt="Nutri-Score"
							width={50}
							height={50}
							className="object-contain"
						/>
						<Image
							src={greenScoreLogo}
							alt="Green Score"
							width={50}
							height={50}
							className="object-contain"
						/>
						<Image
							src={novaGroupLogo}
							alt="NOVA Group"
							width={20}
							height={20}
							className="object-contain"
						/>
					</div>
				</div>
				<div className="flex flex-col space-y-4">
					<h1 className="text-3xl font-bold">{item?.name}</h1>
					<div className="flex items-baseline gap-2">
						<span className="text-2xl font-bold">${item?.salePrice}</span>
						{(item?.msrp ?? 0) > (item?.salePrice ?? 0) && (
							<span className="text-lg text-gray-500 line-through">
								${item?.msrp ?? 0}
							</span>
						)}
					</div>
					<div>
						<h2 className="text-lg font-semibold">Brand</h2>
						<p>{item?.brandName}</p>
					</div>
					{item?.shortDescription && (
						<div>
							<h2 className="text-lg font-semibold">Description</h2>
							<p>{item.shortDescription}</p>
						</div>
					)}
					<div>
						<h2 className="text-lg font-semibold">Details</h2>
						<ul className="space-y-2">
							<li>
								<span className="font-medium">Model:</span>
								{item?.modelNumber ?? "Unknown"}
							</li>
							{item?.size && (
								<li>
									<span className="font-medium">Size:</span> {item.size}
								</li>
							)}
							{item?.color && (
								<li>
									<span className="font-medium">Color:</span> {item.color}
								</li>
							)}
							<li>
								<span className="font-medium">Availability:</span>
								{/* TODO consider marking everything ih stock */}
								{item?.availableOnline ? "In Stock" : "Out of Stock"}
							</li>
						</ul>
					</div>
					<Button className="mt-4 rounded-md px-4 py-2">Add to Cart</Button>
				</div>
			</div>
		</div>
	);
}

function ProductDetailsSkeleton() {
	return (
		<div className="container mx-auto p-6">
			<div className="grid gap-8 md:grid-cols-2">
				<Skeleton className="aspect-square w-full rounded-lg" />
				<div className="flex flex-col space-y-4">
					<Skeleton className="h-10 w-3/4" />
					<Skeleton className="h-8 w-1/4" />
					<div className="space-y-2">
						<Skeleton className="h-6 w-1/6" />
						<Skeleton className="h-5 w-1/3" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-6 w-1/4" />
						<Skeleton className="h-20 w-full" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-6 w-1/5" />
						<div className="space-y-2">
							<Skeleton className="h-5 w-2/3" />
							<Skeleton className="h-5 w-1/2" />
							<Skeleton className="h-5 w-3/5" />
						</div>
					</div>
					<Skeleton className="h-10 w-1/3" />
				</div>
			</div>
		</div>
	);
}
