import Link from "next/link";
import React from "react";

import { ShoppingBasket } from "lucide-react";

import { Button } from "@/components/ui/button";

const EmptyCart: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center py-16 text-center">
			<div className="bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-full">
				<ShoppingBasket className="text-muted-foreground h-8 w-8" />
			</div>

			<h2 className="mb-2 text-2xl font-bold">Your Cart is Empty</h2>

			<p className="text-muted-foreground mb-6 max-w-md">
				Looks like you haven&apos;t added any items to your cart yet. Start
				shopping sustainably to make better choices for yourself and the planet.
			</p>

			<Button asChild>
				<Link href="/products">Find Sustainable Products</Link>
			</Button>
		</div>
	);
};

export default EmptyCart;
