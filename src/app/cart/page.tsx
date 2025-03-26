"use client";

import React, { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Apple, Leaf, MapPin, RefreshCw, Scale } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type SwapPreference, useCart } from "@/contexts/cart-context";

import CartItem from "./cart-item";
import CartSummary from "./cart-summary";
import EmptyCart from "./empty-cart";
// import SwapPage from "./swap/page";
import SwappedItem from "./swapped-item";

const swapOptions: {
	value: SwapPreference;
	label: string;
	icon: React.ReactNode;
}[] = [
	{
		value: "sustainable",
		label: "Sustainable",
		icon: <Leaf className="h-4 w-4" />,
	},
	{
		value: "healthier",
		label: "Healthier",
		icon: <Apple className="h-4 w-4" />,
	},
	{ value: "local", label: "Local", icon: <MapPin className="h-4 w-4" /> },
	{ value: "balanced", label: "Balanced", icon: <Scale className="h-4 w-4" /> },
];

// Items that are frequently bought together
// TODO: not needed without mock data
// const frequentlyBoughtTogether = products
// 	.filter(
// 		(product) => product.isPopular && product.sustainability.locallySourced,
// 	)
// 	.slice(0, 4);

const Cart: React.FC = () => {
	const {
		items,
		swapPreference,
		setSwapPreference,
		hasSwappedItems,
		findSwapAlternatives,
		swapItem,
		// addItem, // not needed since not adding mock data
	} = useCart();
	const [showSecondColumn, setShowSecondColumn] = useState(false);

	// Filter items for each column
	const originalItems = items.filter((item) => !item.swappedFor);
	const swappedItems = items.filter((item) => item.swappedFor);

	// Effect to handle the second column animation
	useEffect(() => {
		if (hasSwappedItems && !showSecondColumn) {
			// Small delay before showing the second column for better UX
			const timer = setTimeout(() => {
				setShowSecondColumn(true);
			}, 100);

			return () => clearTimeout(timer);
		} else if (!hasSwappedItems && showSecondColumn) {
			setShowSecondColumn(false);
		}
	}, [hasSwappedItems, showSecondColumn]);

	// Function to handle swapping all items
	const handleSwapAll = async () => {
		// Only process items that haven't been swapped yet
		const itemsToSwap = items.filter((item) => !item.swappedFor);

		if (itemsToSwap.length === 0) {
			toast.info("No items available to swap");
			return;
		}

		const swappingRes = itemsToSwap.map(async (item) => {
			// we are just getting single alternative for now
			// TODO: maybe get top 5, idonno
			const alternatives = await findSwapAlternatives(item.product.upc);

			// get the first alternative in terms of swapping by default since that will be the most relevant
			const alternative = alternatives?.[0];
			if (alternative) {
				// swapping with current item
				swapItem(item.product.itemId, alternative);
				return true;
			}
			return false;
		});

		const results = await Promise.all(swappingRes);
		const swappedCount = results.filter(Boolean).length;

		if (swappedCount > 0) {
			toast.success(
				`Swapped ${swappedCount} items based on your ${swapPreference} preference`,
			);
		} else {
			toast.info("No suitable alternatives found for your items");
		}
	};

	// Function to add frequently bought together items to cart
	// const handleAddFrequentItem = (productId: number) => {
	// 	const product = products.find((p) => p.id === productId);
	// 	if (product) {
	// 		addItem(product);
	// 		toast.success(`${product.name} added to your cart`);
	// 	}
	// };

	if (items.length === 0) {
		return <EmptyCart />;
	}

	return (
		<div className="flex min-h-screen flex-col">
			{/* <Navbar /> */}

			<div className="container mx-auto flex-1 px-4 py-8">
				<div className="mb-8">
					<h1 className="mb-2 text-3xl font-bold">Your Cart</h1>
					<p className="text-muted-foreground">
						Review your items and swap for better alternatives
					</p>
				</div>

				{/* Swap Preferences Selector */}
				<div className="mb-8 rounded-lg border bg-white p-4">
					<div className="flex flex-wrap items-center justify-between">
						<div>
							<h2 className="mb-3 text-sm font-medium">
								Select Swap Preference
							</h2>
							<div className="flex flex-wrap gap-2">
								{swapOptions.map((option) => (
									<Button
										key={option.value}
										variant={
											swapPreference === option.value ? "default" : "outline"
										}
										className="flex items-center gap-2"
										onClick={() => setSwapPreference(option.value)}>
										{option.icon}
										{option.label}
									</Button>
								))}
							</div>
						</div>

						{/* Swap All Button */}
						{originalItems.length > 0 && (
							<Button
								onClick={() => void handleSwapAll()}
								className="mt-3 flex items-center gap-2 md:mt-0">
								<RefreshCw className="h-4 w-4" />
								Swap All Items
							</Button>
						)}
					</div>
				</div>

				{/* Swap Page */}
				{/* <SwapPage /> */}

				{/* Main cart layout with fixed column widths */}
				<div className="grid grid-cols-12 gap-8">
					{/* First Column - Original items and unswapped items (fixed width) */}
					<div
						className={`col-span-12 lg:col-span-${showSecondColumn ? "4" : "8"}`}>
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-xl font-semibold">Cart Items</h2>
							<Badge variant="outline">{originalItems.length} items</Badge>
						</div>

						<div className="space-y-4">
							{originalItems.map((item, index) => (
								<CartItem key={index} item={item} />
							))}
						</div>
					</div>

					{/* Second Column - Swapped items */}
					<AnimatePresence>
						{showSecondColumn ? (
							<motion.div
								className="col-span-12 lg:col-span-4"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								transition={{ duration: 0.3, ease: "easeOut" }}>
								<div>
									<div className="mb-4 flex items-center justify-between">
										<h2 className="text-xl font-semibold">Better Choices</h2>
										<Badge variant="outline">{swappedItems.length} items</Badge>
									</div>

									<div className="space-y-4">
										{swappedItems.map((item) => (
											<SwappedItem key={item.product.itemId} item={item} />
										))}
									</div>
								</div>
							</motion.div>
						) : (
							<div className="hidden lg:col-span-4 lg:block"></div>
						)}
					</AnimatePresence>

					{/* Third Column - Cart Summary (fixed width, always on the right) */}
					<div className="col-span-12 lg:col-span-4">
						<CartSummary />
					</div>
				</div>

				{/* Frequently Bought Together Section */}
				{/* <div className="mt-16">
					<h2 className="mb-6 text-2xl font-semibold">
						Frequently Bought Together
					</h2>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{frequentlyBoughtTogether.map((product) => (
							<div
								key={product.id}
								className="overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-md">
								<div className="h-48 overflow-hidden">
									<img
										src={product.image}
										alt={product.name}
										className="h-full w-full object-cover"
									/>
								</div>
								<div className="p-4">
									<h3 className="mb-1 font-medium">{product.name}</h3>
									<p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
										{product.description}
									</p>
									<div className="flex items-center justify-between">
										<span className="font-semibold">
											${product.price.toFixed(2)}
										</span>
										<Button
											size="sm"
											onClick={() => handleAddFrequentItem(product.id)}>
											<ShoppingBag className="mr-1 h-4 w-4" />
											Add
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default Cart;
