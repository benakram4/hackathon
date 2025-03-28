"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { toast } from "sonner";

import {
	type LocalAlternativesResponse,
	fetchLocalAlternatives,
} from "@/helper/gemini";
import { fetchOffSwapItem, fetchOffWalmartItems } from "@/helper/off";
import {
	type WalmartItemsInBulk,
	fetchWalmartItemByQuery,
	fetchWalmartItemsInBulk,
} from "@/helper/walmart";
import { type WalmartItem } from "@/types";

export type SwapPreference = "sustainable" | "healthier" | "local" | "balanced";

export interface CartItem {
	product: WalmartItem;
	quantity: number;
	swappedFor?: WalmartItem;
	swapType?: SwapPreference;
}

interface CartContextType {
	items: CartItem[];
	swapPreference: SwapPreference;
	totalItems: number;
	subtotal: number;
	hasSwappedItems: boolean;
	cartLoaded: boolean;
	swapLoading: boolean;
	addItem: (product: WalmartItem) => void;
	addToCart: (product: WalmartItem, quantity?: number) => void;
	removeFromCart: (productId: number) => void;
	updateQuantity: (productId: number, quantity: number) => void;
	findSwapAlternatives: (
		product: WalmartItem,
		onProgress?: (items: WalmartItem[]) => void,
	) => Promise<WalmartItem[] | [] | string>;
	swapItem: (
		originalProductId: number,
		alternativeProduct: WalmartItem,
	) => void;
	revertSwap: (productId: number) => void;
	setSwapPreference: (preference: SwapPreference) => void;
	clearCart: () => void;
	// getImpactMetrics: () => {
	// 	co2Saved: string;
	// 	waterSaved: string;
	// 	wasteReduced: string;
	// };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [items, setItems] = useState<CartItem[]>([]);
	const [swapPreference, setSwapPreference] =
		useState<SwapPreference>("sustainable");

	// indicator for cart loaded from local storage
	const [cartLoaded, setCartLoaded] = useState(false);

	// flag for tracking swap of product
	const [swapLoading, setSwapLoading] = useState(false);

	const totalItems = items.reduce((total, item) => total + item.quantity, 0);
	const subtotal = items.reduce((total, item) => {
		const price = item.swappedFor
			? item.swappedFor.salePrice
			: item.product.salePrice;
		return total + price * item.quantity;
	}, 0);
	const hasSwappedItems = items.some((item) => item.swappedFor);

	useEffect(() => {
		const savedCart = localStorage.getItem("cart");
		if (savedCart) {
			try {
				console.log("loading from cart local storage");
				setItems(JSON.parse(savedCart));
			} catch (error) {
				console.error("Failed to parse cart from localStorage:", error);
			}
		}
		setCartLoaded(true);
	}, []);

	useEffect(() => {
		if (cartLoaded) {
			localStorage.setItem("cart", JSON.stringify(items));
		}
	}, [items]);

	const addToCart = (product: WalmartItem, quantity = 1) => {
		setItems((prevItems) => {
			const existingItemIndex = prevItems.findIndex(
				(item) => item.product.itemId === product.itemId,
			);

			if (existingItemIndex >= 0) {
				const updatedItems = [...prevItems];
				updatedItems[existingItemIndex]!.quantity += quantity;
				toast.success(`Updated quantity for ${product.name}`);
				return updatedItems;
			} else {
				toast.success(`Added ${product.name} to cart`);
				return [...prevItems, { product, quantity }];
			}
		});
	};

	const removeFromCart = (productId: number) => {
		setItems((prevItems) => {
			const itemToRemove = prevItems.find(
				(item) =>
					item.product.itemId === productId ||
					(item.swappedFor && item.swappedFor.itemId === productId),
			);

			if (itemToRemove) {
				toast.success(`Removed ${itemToRemove.product.name} from cart`);
			}

			return prevItems.filter(
				(item) =>
					item.product.itemId !== productId &&
					(!item.swappedFor || item.swappedFor.itemId !== productId),
			);
		});
	};

	const updateQuantity = (productId: number, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId);
			return;
		}

		setItems((prevItems) =>
			prevItems.map((item) =>
				item.product.itemId === productId ||
				(item.swappedFor && item.swappedFor?.itemId === productId)
					? { ...item, quantity }
					: item,
			),
		);
	};

	const findSwapAlternatives = async (
		product: WalmartItem,
		onProgress?: (items: WalmartItem[]) => void,
	) => {
		try {
			setSwapLoading(true);
			console.log(
				`finding alternatives for ${product.upc} with preference ${swapPreference}`,
			);

			if (swapPreference === "local") {
				// expect product names array as response
				const localAlternatives: LocalAlternativesResponse | null =
					await fetchLocalAlternatives(product);

				if (!localAlternatives) {
					return [];
				}

				// here should be check for if the flag for isCanadian is true than return
				if (localAlternatives.isCanadian) {
					toast.success(
						"YAYYY, what you have currently already a Canadian product!",
					);
					return "You already have a Canadian product! :grin:";
				}

				// expecting to be filled with local alternatives that we can find
				const items: WalmartItem[] = [];

				for (const alternative of localAlternatives.alternative_product_names) {
					const item: WalmartItem | null =
						await fetchWalmartItemByQuery(alternative);

					if (!item) {
						continue;
					}

					// check if we already have this item in cart
					if (items.find((existing) => existing.itemId === item.itemId)) {
						console.warn(
							`Item already in swap list: ${JSON.stringify(item)} - SKIPPING`,
						);
						continue;
					}

					items.push(item);
				}

				// request walmart api with product names we got as local alternatives
				return items;
			}

			// find walmart item from off api
			const walmartOffItem = await fetchOffWalmartItems(product.upc);

			if (!walmartOffItem) {
				return [];
			}

			// get swapped product from off api
			// expect getting array with upc of top 3 products with highest eco score
			const offSwapItems: { _id: string; environmental_score_score: string }[] =
				await fetchOffSwapItem(walmartOffItem, swapPreference);

			if (!offSwapItems) {
				return [];
			}

			console.log(`found swap item for ${product.upc}`, offSwapItems);

			const walmartSwapItems: WalmartItemsInBulk[] =
				await fetchWalmartItemsInBulk(offSwapItems, {
					onItemFound: (item) => {
						if (onProgress && item.details) {
							onProgress([item.details]);
						}
					},
				});

			console.log(`found alternatives for ${product.upc}`, walmartSwapItems);

			return walmartSwapItems
				? walmartSwapItems.map((item) => item.details!).filter(Boolean)
				: [];
		} catch (error) {
			console.error("Error finding swap alternatives:", error);
			return [];
		} finally {
			setSwapLoading(false);
		}
	};

	const swapItem = (
		originalProductId: number,
		alternativeProduct: WalmartItem,
	) => {
		setItems((prevItems) =>
			prevItems.map((item) => {
				if (item.product.itemId === originalProductId) {
					toast.success(
						`Swapped ${item.product.name} for ${alternativeProduct.name}`,
					);
					return {
						...item,
						swappedFor: alternativeProduct,
						swapType: swapPreference,
					};
				}
				return item;
			}),
		);
	};

	const revertSwap = (productId: number) => {
		setItems((prevItems) =>
			prevItems.map((item) => {
				if (item.product.itemId === productId && item.swappedFor) {
					toast.info(`Reverted swap for ${item.product.name}`);
					return {
						...item,
						swappedFor: undefined,
						swapType: undefined,
					};
				}
				return item;
			}),
		);
	};

	// const getImpactMetrics = () => {
	// 	let co2Saved = 0;
	// 	let waterSaved = 0;
	// 	let wasteReduced = 0;

	// 	items.forEach((item) => {
	// 		if (item.swappedFor) {
	// 			const alternative = productAlternatives.find(
	// 				(alt) =>
	// 					alt.regularProduct.id === item.product.id ||
	// 					alt.sustainableAlternative.id === item.swappedFor?.id,
	// 			);

	// 			if (alternative) {
	// 				const co2Match =
	// 					alternative.impactSavings.co2Reduction.match(/\d+(\.\d+)?/);
	// 				const waterMatch =
	// 					alternative.impactSavings.waterSaved.match(/\d+(\.\d+)?/);

	// 				if (co2Match) co2Saved += parseFloat(co2Match[0]) * item.quantity;
	// 				if (waterMatch)
	// 					waterSaved += parseFloat(waterMatch[0]) * item.quantity;

	// 				wasteReduced += item.quantity;
	// 			}
	// 		}
	// 	});

	// 	return {
	// 		co2Saved: `${co2Saved.toFixed(1)}kg CO2`,
	// 		waterSaved: `${waterSaved.toFixed(0)} liters`,
	// 		wasteReduced: `${wasteReduced} items`,
	// 	};
	// };

	const addItem = (product: WalmartItem) => {
		addToCart(product, 1);
	};
	const clearCart = () => {
		setItems([]);
	};
	const contextValue: CartContextType = {
		items,
		swapPreference,
		totalItems,
		subtotal,
		hasSwappedItems,
		cartLoaded,
		swapLoading,
		addItem,
		addToCart,
		removeFromCart,
		updateQuantity,
		findSwapAlternatives,
		swapItem,
		revertSwap,
		setSwapPreference,
		clearCart,
		// getImpactMetrics,
	};

	return (
		<CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
