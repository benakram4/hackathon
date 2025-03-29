"use client";

import { useEffect } from "react";

import { useCart } from "@/contexts/cart-context";
// import { productAlternatives, products } from "@/data/products";
import { fetchWalmartItem } from "@/helper/walmart";

export const InitializeCart = () => {
	const { items, addToCart, cartLoaded } = useCart();

	useEffect(() => {
		// // Only add items if the cart is empty
		// if (items.length === 0) {
		// 	// Find non-sustainable items
		// 	const nonSustainableItems = products
		// 		.filter(
		// 			(product) =>
		// 				product.sustainability.carbonFootprint === "high" ||
		// 				(!product.sustainability.locallySourced &&
		// 					!product.sustainability.organicCertified),
		// 		)
		// 		.slice(0, 4);

		// 	// Add items to cart
		// 	nonSustainableItems.forEach((product) => {
		// 		addToCart(product, 1);
		// 	});

		// 	// Swap two of the items
		// 	setTimeout(() => {
		// 		const itemsToSwap = nonSustainableItems.slice(0, 2);

		// 		itemsToSwap.forEach((product) => {
		// 			// Find an alternative for this product
		// 			const alternative = productAlternatives.find(
		// 				(alt) => alt.regularProduct.id === product.id,
		// 			);

		// 			if (alternative) {
		// 				swapItem(product.id, alternative.sustainableAlternative);
		// 			}
		// 		});
		// 	}, 500); // Small delay to ensure items are added first
		// }

		// add nutella to cart for swapping
		// Only add items if the cart is empty
		const addItems = async () => {
			if (!cartLoaded) return; // Wait until cart is loaded

			if (items.length === 0) {
				console.log("attempting to add shit: ", items.length);
				const nutellaItem = await fetchWalmartItem("009800895007");

				addToCart(nutellaItem, 1);
			}
		};

		void addItems();
	}, [items.length, addToCart, cartLoaded]);

	return null; // This component doesn't render anything
};

export default InitializeCart;
