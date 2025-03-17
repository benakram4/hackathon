import Image from "next/image";

import { useAtom } from "jotai";
import { Heart, Leaf, ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { shoppingCartAtom } from "@/store";
import type { WalmartItem } from "@/types/walmart";

interface ProductCardProps {
	product: WalmartItem;
}

export default function ProductCard({ product }: ProductCardProps) {
	const [shoppingCart, setShoppingCart] = useAtom(shoppingCartAtom);
	const inCart = shoppingCart.some((item) => item.itemId === product.itemId);

	const renderSustainabilityRating = (rating: number) => {
		const fullLeaves = Math.floor(rating);
		const hasHalfLeaf = rating % 1 >= 0.5;

		// Determine color based on rating
		let colorClass = "";
		if (rating < 3) {
			colorClass = "fill-destructive text-destructive";
		} else if (rating < 4) {
			colorClass = "fill-amber-500 text-amber-500";
		} else {
			colorClass = "fill-primary text-primary";
		}

		return (
			<div className="flex">
				{/* Full leaves */}
				{Array(fullLeaves)
					.fill(0)
					.map((_, i) => (
						<Leaf
							key={`full-${i}`}
							className={`h-3.5 w-3.5 ${colorClass}`}
							fill="currentColor"
						/>
					))}

				{/* Half leaf */}
				{hasHalfLeaf && (
					<div className="relative h-3.5 w-3.5">
						<Leaf
							className={`absolute top-0 left-0 h-3.5 w-3.5 ${colorClass}`}
							fill="currentColor"
							style={{ clipPath: "inset(0 50% 0 0)" }}
						/>
						<Leaf
							className="text-muted absolute top-0 left-0 h-3.5 w-3.5"
							style={{ clipPath: "inset(0 0 0 50%)" }}
						/>
					</div>
				)}

				{/* Empty leaves */}
				{Array(5 - fullLeaves - (hasHalfLeaf ? 1 : 0))
					.fill(0)
					.map((_, i) => (
						<Leaf key={`empty-${i}`} className="text-muted h-3.5 w-3.5" />
					))}
			</div>
		);
	};

	const isInStock = product.stock !== "Not available";

	// update cart based on product availability in cart
	const updateCart = () => {
		if (inCart) {
			// Remove product from cart
			setShoppingCart((prevCart) =>
				prevCart.filter((item) => item.itemId !== product.itemId),
			);
			console.log("Removed from cart");
		} else {
			// Add to cart
			setShoppingCart((prevCart) => [...prevCart, product]);
			console.log("adding to cart");
		}
	};

	return (
		<div className="group border-border bg-card hover:border-primary/20 relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg">
			{/* Wishlist Button */}
			<button className="bg-background/80 hover:bg-primary/10 hover:text-primary absolute top-4 right-4 z-10 rounded-full p-2 backdrop-blur-sm transition-all">
				<Heart className="h-5 w-5" />
			</button>

			{/* Image Section */}
			<div className="bg-muted/50 relative h-64 w-full overflow-hidden">
				<div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
					<Image
						src={product.largeImage || "/placeholder.svg?height=200&width=200"}
						alt={product.name}
						fill
						sizes="200px"
						className="object-contain p-6"
					/>
				</div>
				<div className="bg-card/80 absolute right-3 bottom-3 rounded-full px-3 py-1 shadow-md backdrop-blur-sm">
					{renderSustainabilityRating(1.5)}
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
					className="bg-primary text-primary-foreground hover:bg-primary/90 flex cursor-pointer items-center gap-2"
					disabled={!isInStock}
					onClick={updateCart}>
					<ShoppingCart className="h-4 w-4" />
					<span className="sm:block">
						{isInStock ? (inCart ? "Remove" : "Add to Cart") : "Sold Out"}
					</span>
				</Button>
			</div>

			{/* Stock Status */}
			<div className="border-border bg-muted/30 flex w-full items-center justify-center border-t p-3">
				<div className="flex items-center gap-2">
					<div
						className={`h-3 w-3 rounded-full ${isInStock ? "bg-primary" : "bg-destructive"}`}
						title={isInStock ? "In Stock" : "Out of Stock"}></div>
					<span className="text-foreground text-sm font-medium">
						{isInStock ? "In Stock" : "Out of Stock"}
					</span>
				</div>
			</div>
		</div>
	);
}
