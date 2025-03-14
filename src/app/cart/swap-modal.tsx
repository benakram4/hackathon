"use client";

import React from "react";

import { BarChart4, Droplets, Leaf } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/contexts/cart-context";
import { Product, productAlternatives } from "@/data/products";

interface SwapModalProps {
	isOpen: boolean;
	onClose: () => void;
	originalProduct: Product;
}

const SwapModal: React.FC<SwapModalProps> = ({
	isOpen,
	onClose,
	originalProduct,
}) => {
	const { findSwapAlternatives, swapItem, swapPreference } = useCart();

	const alternatives = findSwapAlternatives(originalProduct.id);

	const handleSwap = (alternative: Product) => {
		swapItem(originalProduct.id, alternative);
		onClose();
	};

	// Find the alternative data to display benefits
	const getAlternativeData = (alternative: Product) => {
		const alternativeData = productAlternatives.find(
			(data) =>
				data.sustainableAlternative.id === alternative.id ||
				data.regularProduct.id === originalProduct.id
		);

		return alternativeData;
	};

	// Calculate price difference
	const getPriceDifference = (originalPrice: number, newPrice: number) => {
		const diff = newPrice - originalPrice;
		if (diff === 0)
			return <span className="text-muted-foreground">Same price</span>;

		return diff > 0 ? (
			<span className="text-rose-500">+${diff.toFixed(2)}</span>
		) : (
			<span className="text-emerald-500">
				Save ${Math.abs(diff).toFixed(2)}
			</span>
		);
	};

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Find a Better Option</DialogTitle>
					<DialogDescription>
						Discover {swapPreference} alternatives for {originalProduct.name}
					</DialogDescription>
				</DialogHeader>

				{alternatives.length > 0 ? (
					<div className="my-2 space-y-4">
						{alternatives.map((alternative) => {
							const alternativeData = getAlternativeData(alternative);

							return (
								<div
									key={alternative.id}
									className="hover:border-primary/50 hover:bg-primary/5 flex gap-3 rounded-lg border p-3 transition-colors">
									<div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded">
										<img
											src={alternative.image}
											alt={alternative.name}
											className="h-full w-full object-cover"
										/>
									</div>

									<div className="flex-1">
										<div className="flex items-start justify-between">
											<h4 className="text-sm font-medium">
												{alternative.name}
											</h4>
											{alternative.sustainability.organicCertified && (
												<Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none text-xs">
													<Leaf className="mr-1 h-3 w-3" />
													Organic
												</Badge>
											)}
										</div>

										<p className="text-muted-foreground mt-1 mb-2 line-clamp-2 text-xs">
											{alternative.description}
										</p>

										{alternativeData && (
											<div className="grid grid-cols-3 gap-1 text-xs">
												<div className="flex items-center gap-1">
													<BarChart4 className="text-primary h-3 w-3" />
													<span>
														{alternativeData.impactSavings.co2Reduction}
													</span>
												</div>
												<div className="flex items-center gap-1">
													<Droplets className="text-primary h-3 w-3" />
													<span>
														{alternativeData.impactSavings.waterSaved}
													</span>
												</div>
											</div>
										)}
									</div>

									<div className="flex flex-col items-end justify-between">
										<div className="text-right">
											<div className="font-medium">
												${alternative.price.toFixed(2)}
											</div>
											<div className="text-xs">
												{getPriceDifference(
													originalProduct.price,
													alternative.price
												)}
											</div>
										</div>

										<Button
											size="sm"
											className="mt-2"
											onClick={() => handleSwap(alternative)}>
											Swap
										</Button>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div className="py-6 text-center">
						<p className="text-muted-foreground">
							No alternatives found for this product.
						</p>
					</div>
				)}

				<DialogFooter className="sm:justify-between">
					<Button variant="ghost" size="sm" onClick={onClose}>
						Cancel
					</Button>
					<Button variant="outline" size="sm" asChild>
						<a href="#" target="_blank" rel="noopener noreferrer">
							Learn More
						</a>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default SwapModal;
