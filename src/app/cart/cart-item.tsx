"use client";

import React, { useState } from "react";

import { Minus, Plus, RefreshCw, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	type CartItem as CartItemType,
	useCart,
} from "@/contexts/cart-context";

import SwapModal from "./swap-modal";

interface CartItemProps {
	item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
	const { updateQuantity, removeFromCart, revertSwap } = useCart();
	const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);

	const handleIncrement = () => {
		updateQuantity(item.product.id, item.quantity + 1);
	};

	const handleDecrement = () => {
		if (item.quantity > 1) {
			updateQuantity(item.product.id, item.quantity - 1);
		}
	};

	const handleRemove = () => {
		removeFromCart(item.product.id);
	};

	const handleRevertSwap = () => {
		revertSwap(item.product.id);
	};

	// If the item has been swapped, it's in the original column but needs to indicate it was swapped
	const isSwapped = !!item.swappedFor;
	const displayProduct = item.product;

	return (
		<div
			className={`mb-4 flex flex-col rounded-lg border bg-white p-4 ${isSwapped ? "opacity-50" : ""}`}>
			<div className="flex gap-4">
				<div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
					<img
						src={displayProduct.image}
						alt={displayProduct.name}
						className="h-full w-full object-cover"
					/>
				</div>

				<div className="min-w-0 flex-1">
					<div className="mb-1 flex items-start justify-between">
						<h3 className="line-clamp-1 text-sm font-medium sm:text-base">
							{displayProduct.name}
						</h3>
						{isSwapped && (
							<Badge variant="outline" className="ml-2">
								Swapped
							</Badge>
						)}
					</div>

					<p className="text-muted-foreground mb-2 line-clamp-2 text-xs">
						{displayProduct.description}
					</p>

					<div className="mb-2 flex flex-wrap gap-1">
						{displayProduct.tags.slice(0, 2).map((tag) => (
							<span
								key={tag}
								className="bg-secondary rounded-full px-2 py-0.5 text-xs">
								{tag}
							</span>
						))}
					</div>
				</div>
			</div>

			<div className="mt-3 flex items-center justify-between border-t pt-3">
				<div className="flex items-center">
					<span className="mr-4 font-medium">
						${displayProduct.price.toFixed(2)}
					</span>

					<div className="flex items-center rounded-md border">
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 rounded-none"
							onClick={handleDecrement}
							disabled={isSwapped}>
							<Minus className="h-3 w-3" />
						</Button>

						<span className="w-8 text-center text-sm">{item.quantity}</span>

						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 rounded-none"
							onClick={handleIncrement}
							disabled={isSwapped}>
							<Plus className="h-3 w-3" />
						</Button>
					</div>
				</div>

				<div className="flex items-center gap-2">
					{isSwapped ? (
						<Button
							variant="outline"
							size="sm"
							onClick={handleRevertSwap}
							className="text-xs">
							<RefreshCw className="mr-1 h-3 w-3" />
							Revert
						</Button>
					) : (
						<>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setIsSwapModalOpen(true)}
								className="text-xs">
								Find a Better Option
							</Button>

							<Button
								variant="ghost"
								size="icon"
								onClick={handleRemove}
								className="text-destructive h-8 w-8">
								<Trash2 className="h-4 w-4" />
							</Button>
						</>
					)}
				</div>
			</div>

			<SwapModal
				isOpen={isSwapModalOpen}
				onClose={() => setIsSwapModalOpen(false)}
				originalProduct={item.product}
			/>
		</div>
	);
};

export default CartItem;
