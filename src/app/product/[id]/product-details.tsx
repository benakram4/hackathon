"use client";

import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";
import { getItem } from "@/lib/walmart/api";

export default function ProductDetails({ itemId }: { itemId: string }) {
	const {
		data: item,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["item", itemId],
		queryFn: () => getItem(itemId),
	});

	if (isLoading) {
		return <ProductDetailsSkeleton />;
	}

	if (error || !item) {
		return (
			<div className="p-8 text-center">Failed to load product details</div>
		);
	}

	return (
		<div className="container mx-auto p-6">
			<div className="grid gap-8 md:grid-cols-2">
				<div className="relative aspect-square overflow-hidden rounded-lg">
					{item.largeImage && (
						<Image
							src={item.largeImage}
							alt={item.name}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, 50vw"
							priority
						/>
					)}
				</div>
				<div className="flex flex-col space-y-4">
					<h1 className="text-3xl font-bold">{item.name}</h1>
					<div className="flex items-baseline gap-2">
						<span className="text-2xl font-bold">${item.salePrice}</span>
						{item.msrp > item.salePrice && (
							<span className="text-lg text-gray-500 line-through">
								${item.msrp}
							</span>
						)}
					</div>
					<div>
						<h2 className="text-lg font-semibold">Brand</h2>
						<p>{item.brandName}</p>
					</div>
					{item.shortDescription && (
						<div>
							<h2 className="text-lg font-semibold">Description</h2>
							<p>{item.shortDescription}</p>
						</div>
					)}
					<div>
						<h2 className="text-lg font-semibold">Details</h2>
						<ul className="space-y-2">
							<li>
								<span className="font-medium">Model:</span> {item.modelNumber}
							</li>
							{item.size && (
								<li>
									<span className="font-medium">Size:</span> {item.size}
								</li>
							)}
							{item.color && (
								<li>
									<span className="font-medium">Color:</span> {item.color}
								</li>
							)}
							<li>
								<span className="font-medium">Availability:</span>{" "}
								{item.availableOnline ? "In Stock" : "Out of Stock"}
							</li>
						</ul>
					</div>
					<button className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
						Add to Cart
					</button>
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
