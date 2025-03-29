"use client";

import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import Spinner from "@/components/svgs/spinner";
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
import { type WalmartItem } from "@/types";

interface SwapModalProps {
	isOpen: boolean;
	onClose: () => void;
	originalProduct: WalmartItem;
}

const SwapModal: React.FC<SwapModalProps> = ({
	isOpen,
	onClose,
	originalProduct,
}) => {
	const { findSwapAlternatives, swapItem, swapPreference, swapLoading } =
		useCart();
	const [progressiveItems, setProgressiveItems] = useState<WalmartItem[]>([]);

	// Using useQuery to manage alternatives fetching
	const {
		data: alternatives,
		isFetching: isAlternativesFetching,
		isLoading: isAlternativesLoading,
		isError: isAlternativesError,
	} = useQuery({
		queryKey: ["swapAlternatives", swapPreference, originalProduct.upc],
		queryFn: async () => {
			setProgressiveItems([]); // Reset on new fetch
			return await findSwapAlternatives(originalProduct.upc, (items) => {
				setProgressiveItems((prev) => [...prev, ...items]);
			});
		},
		enabled: isOpen, // Only fetch when modal is open
		staleTime: 60 * 60 * 1000, // 1 hour cache
	});

	// useEffect(() => {
	// 	// no need to request alternatives if the modal is not open
	// 	if (!isOpen) return;

	// 	const getRelevantAlternatives = async () => {
	// 		console.log("trying to find alternative for: ", originalProduct);
	// 		const alterItems = await findSwapAlternatives(originalProduct.upc);

	// 		console.log("alternatives that we got: ", alterItems);

	// 		// filter out product details out of extra data
	// 		// exception is ok since we are making sure that we have details
	// 		const products: WalmartItem[] = alterItems.map((item) => {
	// 			return { ...item.details! };
	// 		});

	// 		setAlternatives(products);
	// 	};

	// 	void getRelevantAlternatives();
	// }, [isOpen, originalProduct]);

	const handleSwap = (alternative: WalmartItem) => {
		swapItem(originalProduct.itemId, alternative);
		onClose();
	};

	// Find the alternative data to display benefits
	// TODO: instead of this we need actual benefits from OFF API
	// const getAlternativeData = (alternative: WalmartItem) => {
	// 	const alternativeData = productAlternatives.find(
	// 		(data) =>
	// 			data.sustainableAlternative.id === alternative.id ||
	// 			data.regularProduct.id === originalProduct.id,
	// 	);

	// 	return alternativeData;
	// };

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

				{isAlternativesLoading && isAlternativesFetching ? (
					<div>
						{progressiveItems.length > 0 &&
							progressiveItems.map((item) => (
								<div
									key={item.itemId}
									className="hover:border-primary/50 hover:bg-primary/5 scroll- flex gap-3 rounded-lg border-2 p-3 transition-colors">
									<div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded">
										<img
											src={item.thumbnailImage}
											alt={item.name}
											className="h-full w-full object-cover"
										/>
									</div>

									<div className="flex-1">
										<div className="flex items-start justify-between">
											<h4 className="text-sm font-medium">{item.name}</h4>
											{/* {alternative.sustainability.organicCertified && (
												<Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none text-xs">
													<Leaf className="mr-1 h-3 w-3" />
													Organic
												</Badge>
											)} */}
											Organic or not
										</div>

										<p className="text-muted-foreground mt-1 mb-2 line-clamp-2 text-xs">
											{item.shortDescription}
										</p>

										{/* {alternativeData && (
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
										)} */}
									</div>

									<div className="flex flex-col items-end justify-between">
										<div className="text-right">
											<div className="font-medium">
												${item.salePrice.toFixed(2)}
											</div>
											<div className="text-xs">
												{getPriceDifference(
													originalProduct.salePrice,
													item.salePrice,
												)}
											</div>
										</div>

										<Button
											size="sm"
											className="mt-2"
											onClick={() => handleSwap(item)}>
											Swap
										</Button>
									</div>
								</div>
							))}
						<div className="flex justify-center py-6">
							<Spinner className="h-10 w-10" />
						</div>
					</div>
				) : alternatives && alternatives?.length > 0 ? (
					<div className="my-2 max-h-96 space-y-4 overflow-y-auto">
						{alternatives?.map((alternative) => {
							// const alternativeData = getAlternativeData(alternative);

							return (
								<div
									key={alternative.itemId}
									className="hover:border-primary/50 hover:bg-primary/5 flex gap-3 rounded-lg border p-3 transition-colors">
									<div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded">
										<img
											src={alternative.thumbnailImage}
											alt={alternative.name}
											className="h-full w-full object-cover"
										/>
									</div>

									<div className="flex-1">
										<div className="flex items-start justify-between">
											<h4 className="text-sm font-medium">
												{alternative.name}
											</h4>
											{/* {alternative.sustainability.organicCertified && (
												<Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none text-xs">
													<Leaf className="mr-1 h-3 w-3" />
													Organic
												</Badge>
											)} */}
											Organic or not
										</div>

										<p className="text-muted-foreground mt-1 mb-2 line-clamp-2 text-xs">
											{alternative.shortDescription}
										</p>

										{/* {alternativeData && (
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
										)} */}
									</div>

									<div className="flex flex-col items-end justify-between">
										<div className="text-right">
											<div className="font-medium">
												${alternative.salePrice.toFixed(2)}
											</div>
											<div className="text-xs">
												{getPriceDifference(
													originalProduct.salePrice,
													alternative.salePrice,
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
