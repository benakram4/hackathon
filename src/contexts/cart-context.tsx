"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { toast } from "sonner";

import { Product, productAlternatives } from "@/data/products";

export type SwapPreference = "sustainable" | "healthier" | "local" | "balanced";

export interface CartItem {
	product: Product;
	quantity: number;
	swappedFor?: Product;
	swapType?: SwapPreference;
}

interface CartContextType {
	items: CartItem[];
	swapPreference: SwapPreference;
	totalItems: number;
	subtotal: number;
	hasSwappedItems: boolean;
	addItem: (product: Product) => void;
	addToCart: (product: Product, quantity?: number) => void;
	removeFromCart: (productId: number) => void;
	updateQuantity: (productId: number, quantity: number) => void;
	findSwapAlternatives: (productId: number) => Product[];
	swapItem: (originalProductId: number, alternativeProduct: Product) => void;
	revertSwap: (productId: number) => void;
	setSwapPreference: (preference: SwapPreference) => void;
	getImpactMetrics: () => {
		co2Saved: string;
		waterSaved: string;
		wasteReduced: string;
	};
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [items, setItems] = useState<CartItem[]>([]);
	const [swapPreference, setSwapPreference] =
		useState<SwapPreference>("sustainable");

	const totalItems = items.reduce((total, item) => total + item.quantity, 0);
	const subtotal = items.reduce((total, item) => {
		const price = item.swappedFor ? item.swappedFor.price : item.product.price;
		return total + price * item.quantity;
	}, 0);
	const hasSwappedItems = items.some((item) => item.swappedFor);

	useEffect(() => {
		const savedCart = localStorage.getItem("cart");
		if (savedCart) {
			try {
				setItems(JSON.parse(savedCart));
			} catch (error) {
				console.error("Failed to parse cart from localStorage:", error);
			}
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(items));
	}, [items]);

	const addToCart = (product: Product, quantity = 1) => {
		setItems((prevItems) => {
			const existingItemIndex = prevItems.findIndex(
				(item) => item.product.id === product.id
			);

			if (existingItemIndex >= 0) {
				const updatedItems = [...prevItems];
				updatedItems[existingItemIndex].quantity += quantity;
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
					item.product.id === productId ||
					(item.swappedFor && item.swappedFor.id === productId)
			);

			if (itemToRemove) {
				toast.success(`Removed ${itemToRemove.product.name} from cart`);
			}

			return prevItems.filter(
				(item) =>
					item.product.id !== productId &&
					(!item.swappedFor || item.swappedFor.id !== productId)
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
				item.product.id === productId ||
				(item.swappedFor && item.swappedFor.id === productId)
					? { ...item, quantity }
					: item
			)
		);
	};

	const findSwapAlternatives = (productId: number): Product[] => {
		const directAlternative = productAlternatives.find(
			(alt) => alt.regularProduct.id === productId
		);

		if (directAlternative) {
			return [directAlternative.sustainableAlternative];
		}

		const item = items.find((item) => item.product.id === productId);
		if (!item) return [];

		const relatedProducts = productAlternatives
			.filter((alt) => {
				if (swapPreference === "sustainable") {
					return (
						alt.sustainableAlternative.sustainability.carbonFootprint ===
							"low" &&
						alt.sustainableAlternative.category === item.product.category
					);
				}

				if (swapPreference === "healthier") {
					return (
						alt.sustainableAlternative.sustainability.organicCertified &&
						alt.sustainableAlternative.category === item.product.category
					);
				}

				if (swapPreference === "local") {
					return (
						alt.sustainableAlternative.sustainability.locallySourced &&
						alt.sustainableAlternative.category === item.product.category
					);
				}

				return alt.sustainableAlternative.category === item.product.category;
			})
			.map((alt) => alt.sustainableAlternative);

		return relatedProducts.length > 0 ? relatedProducts : [];
	};

	const swapItem = (originalProductId: number, alternativeProduct: Product) => {
		setItems((prevItems) =>
			prevItems.map((item) => {
				if (item.product.id === originalProductId) {
					toast.success(
						`Swapped ${item.product.name} for ${alternativeProduct.name}`
					);
					return {
						...item,
						swappedFor: alternativeProduct,
						swapType: swapPreference,
					};
				}
				return item;
			})
		);
	};

	const revertSwap = (productId: number) => {
		setItems((prevItems) =>
			prevItems.map((item) => {
				if (item.product.id === productId && item.swappedFor) {
					toast.info(`Reverted swap for ${item.product.name}`);
					return {
						...item,
						swappedFor: undefined,
						swapType: undefined,
					};
				}
				return item;
			})
		);
	};

	const getImpactMetrics = () => {
		let co2Saved = 0;
		let waterSaved = 0;
		let wasteReduced = 0;

		items.forEach((item) => {
			if (item.swappedFor) {
				const alternative = productAlternatives.find(
					(alt) =>
						alt.regularProduct.id === item.product.id ||
						alt.sustainableAlternative.id === item.swappedFor?.id
				);

				if (alternative) {
					const co2Match =
						alternative.impactSavings.co2Reduction.match(/\d+(\.\d+)?/);
					const waterMatch =
						alternative.impactSavings.waterSaved.match(/\d+(\.\d+)?/);

					if (co2Match) co2Saved += parseFloat(co2Match[0]) * item.quantity;
					if (waterMatch)
						waterSaved += parseFloat(waterMatch[0]) * item.quantity;

					wasteReduced += item.quantity;
				}
			}
		});

		return {
			co2Saved: `${co2Saved.toFixed(1)}kg CO2`,
			waterSaved: `${waterSaved.toFixed(0)} liters`,
			wasteReduced: `${wasteReduced} items`,
		};
	};

	const addItem = (product: Product) => {
		addToCart(product, 1);
	};

	const contextValue: CartContextType = {
		items,
		swapPreference,
		totalItems,
		subtotal,
		hasSwappedItems,
		addItem,
		addToCart,
		removeFromCart,
		updateQuantity,
		findSwapAlternatives,
		swapItem,
		revertSwap,
		setSwapPreference,
		getImpactMetrics,
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
