"use client";

import { useRouter } from "next/navigation";

import { useAtomValue } from "jotai";

import ProductCard from "@/components/ProductCard/ProductCard";
import { Button } from "@/components/ui/button";
import { shoppingCartAtom } from "@/store";
import { WalmartItem } from "@/types";

export default function CartPage() {
	const router = useRouter();
	const shoppingCart = useAtomValue(shoppingCartAtom);

	// If there are no items in the cart, show a message
	if (!shoppingCart.length) {
		return (
			<div className="container mx-auto flex-col p-4 text-center">
				<div>No items in cart</div>
				<Button
					onClick={() => {
						router.push("/products");
					}}>
					Go back to products
				</Button>
			</div>
		);
	}

	console.log(`shoppingCart`, shoppingCart);

	return (
		<div className="container mx-auto p-4">
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{shoppingCart?.map((product: WalmartItem) => (
					<ProductCard key={product.itemId} product={product} />
				))}
			</div>
		</div>
	);
}
