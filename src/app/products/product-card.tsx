"use client";

import Image from "next/image";
import Link from "next/link";

import { Heart, ShoppingCart, Star } from "lucide-react";

import { extractOffLogos } from "@/atoms/off-data";
import { Button } from "@/components/ui/button";
import type { WalmartItem } from "@/types/walmart";

interface ProductCardProps {
	product: WalmartItem;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	knowledgePanelData?: any; // Add knowledge panel data prop
	isLoadingKnowledgePanel?: boolean;
}

export default function ProductCard({
	product,
	knowledgePanelData,
	isLoadingKnowledgePanel = false,
}: ProductCardProps) {
	const { nutriScoreLogo, greenScoreLogo, novaGroupLogo } =
		isLoadingKnowledgePanel
			? {
					nutriScoreLogo:
						"https://static.openfoodfacts.org/images/attributes/dist/nutriscore-unknown-new-en.svg",
					greenScoreLogo:
						"https://static.openfoodfacts.org/images/attributes/dist/green-score-unknown.svg",
					novaGroupLogo:
						"https://static.openfoodfacts.org/images/attributes/dist/nova-group-unknown.svg",
				}
			: extractOffLogos(knowledgePanelData);

	const isInStock = product.stock !== "Not available";

	return (
		<div className="group border-border bg-card hover:border-primary/20 relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg">
			<Link href={`/products/${product.upc}`}>
				{/* Wishlist Button */}
				<button className="bg-background/80 hover:bg-primary/10 hover:text-primary absolute top-4 right-4 z-10 rounded-full p-2 backdrop-blur-sm transition-all">
					<Heart className="h-5 w-5" />
				</button>

				{/* Image Section */}
				<div className="bg-muted/50 relative h-64 w-full overflow-hidden">
					<div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
						<Image
							src={
								product.largeImage || "/placeholder.svg?height=200&width=200"
							}
							alt={product.name ?? "Product Image"}
							fill
							style={{
								objectFit: "contain",
							}}
							className="p-6"
						/>
					</div>
					{/* Render Nutri-Score, Green Score, and NOVA group logos */}
					<div className="bg-card/80 absolute bottom-3 left-3 flex items-center gap-2 rounded-full px-3 py-1 shadow-md backdrop-blur-sm">
						<Image
							src={nutriScoreLogo}
							alt="Nutri-Score"
							width={40}
							height={40}
							className="object-contain"
						/>
						<Image
							src={greenScoreLogo}
							alt="Green Score"
							width={40}
							height={40}
							className="object-contain"
						/>
						<Image
							src={novaGroupLogo}
							alt="NOVA Group"
							width={16}
							height={16}
							className="object-contain"
						/>
					</div>
				</div>

				{/* Content Section */}
				<div className="flex-grow p-5">
					<div className="mb-3 flex items-center justify-between">
						<p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
							{product.brandName || "Brand"}
						</p>
						<div className="flex items-center gap-1">
							<Star className="fill-primary text-primary h-4 w-4" />
							<span className="text-sm font-medium">4.8</span>
						</div>
					</div>

					<h3 className="text-foreground mb-2 line-clamp-1 text-lg font-bold">
						{product.name}
					</h3>
					<p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
						{product.shortDescription}
					</p>
				</div>

				{/* Price & Actions */}
				<div className="border-border flex items-center justify-between border-t p-5">
					<div className="space-y-1">
						<span className="text-foreground text-xl font-bold">
							{product.salePrice
								? `$${product.salePrice}`
								: "Price not available"}
						</span>
					</div>
					<Button
						className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
						disabled={!isInStock}>
						<ShoppingCart className="h-4 w-4" />
						<span className="sm:block">{isInStock ? "Add" : "Sold Out"}</span>
					</Button>
				</div>
			</Link>
		</div>
	);
}
