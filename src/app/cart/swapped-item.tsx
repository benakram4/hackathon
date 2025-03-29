"use client";

import React from "react";

import { Apple, Leaf, MapPin, RefreshCw, Scale, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	type CartItem as CartItemType,
	useCart,
} from "@/contexts/cart-context";

/* eslint-disable @typescript-eslint/no-unused-vars */

interface SwappedItemProps {
	item: CartItemType;
}

const SwappedItem: React.FC<SwappedItemProps> = ({ item }) => {
	const { updateQuantity, removeFromCart, revertSwap } = useCart();

	if (!item.swappedFor) return null;

	const handleIncrement = () => {
		updateQuantity(item.product.itemId, item.quantity + 1);
	};

	const handleDecrement = () => {
		if (item.quantity > 1) {
			updateQuantity(item.product.itemId, item.quantity - 1);
		}
	};

	const handleRemove = () => {
		removeFromCart(item.product.itemId);
	};

	const handleRevertSwap = () => {
		revertSwap(item.product.itemId);
	};

	const originalPrice = item.product.salePrice;
	const newPrice = item.swappedFor.salePrice;
	const priceDifference = newPrice - originalPrice;

	// Get swap type icon
	const getSwapIcon = () => {
		switch (item.swapType) {
			case "sustainable":
				return <Leaf className="text-primary h-3.5 w-3.5" />;
			case "healthier":
				return <Apple className="text-primary h-3.5 w-3.5" />;
			case "local":
				return <MapPin className="text-primary h-3.5 w-3.5" />;
			case "balanced":
				return <Scale className="text-primary h-3.5 w-3.5" />;
			default:
				return null;
		}
	};

	// Get tooltip content based on swap type
	const getTooltipContent = () => {
		switch (item.swapType) {
			case "sustainable":
				return "This swap reduces environmental impact";
			case "healthier":
				return "This swap has better nutritional benefits";
			case "local":
				return "This swap supports local producers";
			case "balanced":
				return "This swap balances sustainability, health, and local sourcing";
			default:
				return "A better alternative";
		}
	};

	return (
		<div className="border-primary/20 mb-4 flex flex-col rounded-lg border bg-white p-4 shadow-sm">
			<div className="flex gap-4">
				{/* swapped shit */}
				<div className="flex-1">
					<h4 className="mb-2 text-sm font-medium">Swapped Item</h4>
					<div className="flex gap-4">
						<div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
							<img
								src={item.swappedFor.thumbnailImage}
								alt={item.swappedFor.name}
								className="h-full w-full object-cover"
							/>
						</div>

						<div className="min-w-0 flex-1">
							<div className="mb-1 flex items-start justify-between">
								<div className="flex items-center gap-2">
									<h3 className="line-clamp-1 text-sm font-medium sm:text-base">
										{item.swappedFor.name}
									</h3>

									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Badge className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1 border-none">
													{getSwapIcon()}
													<span className="text-[10px] capitalize">
														{item.swapType}
													</span>
												</Badge>
											</TooltipTrigger>
											<TooltipContent>
												<p className="text-xs">{getTooltipContent()}</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>

								<Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none">
									Swapped
								</Badge>
							</div>

							<p className="text-muted-foreground mb-2 line-clamp-2 text-xs">
								{item.swappedFor.shortDescription}
							</p>

							{/* TODO: we don't have any tags from walmart data */}
							{/* <div className="mb-2 flex flex-wrap gap-1">
						{item.swappedFor.tags.slice(0, 2).map((tag) => (
							<span
								key={tag}
								className="bg-secondary rounded-full px-2 py-0.5 text-xs">
								{tag}
							</span>
						))}
					</div> */}

							{/* we don't have this info set or arranged from OFF yet */}
							{/* <div className="mt-1 flex items-center gap-1 text-xs">
						<AlertCircle className="text-primary h-3 w-3" />
						<span className="text-primary-foreground">
							{item.swappedFor.sustainability.carbonFootprint === "low"
								? "Lower carbon footprint"
								: item.swappedFor.sustainability.locallySourced
									? "Locally sourced"
									: item.swappedFor.sustainability.organicCertified
										? "Organic certified"
										: "Better alternative"}
						</span>
					</div> */}
						</div>
					</div>

					<div className="mt-3 flex items-center justify-between border-t pt-3">
						<div>
							<div className="flex items-center">
								<span className="mr-2 font-medium">
									${item.swappedFor.salePrice.toFixed(2)}
								</span>

								{priceDifference !== 0 && (
									<span
										className={`text-xs ${priceDifference > 0 ? "text-rose-500" : "text-emerald-500"}`}>
										{priceDifference > 0
											? `+$${priceDifference.toFixed(2)}`
											: `-$${Math.abs(priceDifference).toFixed(2)}`}
									</span>
								)}
							</div>

							<div className="text-muted-foreground mt-0.5 text-xs">
								Qty: {item.quantity}
							</div>
						</div>
					</div>
				</div>

				{/* Original Item (Blacked Out and Smaller) */}
				<div className="flex flex-col items-center opacity-50">
					<div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md grayscale">
						<img
							src={item.product.thumbnailImage}
							alt={item.product.name}
							className="h-full w-full object-cover"
						/>
					</div>
					<p className="text-muted-foreground mt-1 text-center text-xs">
						Original
					</p>
				</div>
			</div>

			<div className="flex items-center justify-between pt-3">
				<Button
					variant="outline"
					size="sm"
					onClick={handleRevertSwap}
					className="text-xs">
					<RefreshCw className="mr-1 h-3 w-3" />
					Revert
				</Button>

				<Button
					variant="ghost"
					size="icon"
					onClick={handleRemove}
					className="text-destructive h-8 w-8">
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};

export default SwappedItem;
