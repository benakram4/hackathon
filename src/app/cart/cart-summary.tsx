"use client";

import React, { useState } from "react";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";

import CheckoutModal from "./checkout-modal";

const CartSummary: React.FC = () => {
	const { items, subtotal } = useCart();
	// const impact = getImpactMetrics();
	const [checkoutOpen, setCheckoutOpen] = useState(false);

	// Assume shipping is free over $50, otherwise $5.99
	const shipping = subtotal > 50 ? 0 : 5.99;

	// Tax calculation (approximate)
	const tax = subtotal * 0.08; // Assuming 8% tax rate

	// Total calculation
	const total = subtotal + shipping + tax;

	return (
		<div className="rounded-lg border bg-white p-5">
			<h3 className="mb-4 text-lg font-medium">Order Summary</h3>

			<div className="mb-6 space-y-3">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Subtotal</span>
					<span>${subtotal.toFixed(2)}</span>
				</div>

				<div className="flex justify-between">
					<span className="text-muted-foreground">Shipping</span>
					<span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
				</div>

				<div className="flex justify-between">
					<span className="text-muted-foreground">Tax</span>
					<span>${tax.toFixed(2)}</span>
				</div>

				<div className="flex justify-between border-t pt-3 font-medium">
					<span>Total</span>
					<span>${total.toFixed(2)}</span>
				</div>
			</div>

			<div className="bg-primary/5 border-primary/20 mb-6 rounded-lg border p-4">
				<h4 className="text-primary mb-3 text-sm font-medium">Your Impact</h4>

				{/* <div className="space-y-2 text-sm">
					<div className="flex items-center gap-2">
						<BarChart4 className="text-primary h-4 w-4" />
						<span>You&apos;ve saved {impact.co2Saved} of emissions</span>
					</div>

					<div className="flex items-center gap-2">
						<Droplets className="text-primary h-4 w-4" />
						<span>You&apos;ve saved {impact.waterSaved} of water</span>
					</div>

					<div className="flex items-center gap-2">
						<Trash2 className="text-primary h-4 w-4" />
						<span>You&apos;ve reduced waste from {impact.wasteReduced}</span>
					</div>
				</div> */}
				<div>impact will be mentioned here!</div>
			</div>

			<Button
				className="mb-3 w-full"
				onClick={() => setCheckoutOpen(true)}
				disabled={items.length === 0}>
				Proceed to Checkout
				<ArrowRight className="ml-1 h-4 w-4" />
			</Button>
			<p className="text-muted-foreground text-center text-xs">
				By checking out, you agree to our Terms of Service and Privacy Policy
			</p>

			<CheckoutModal open={checkoutOpen} onOpenChange={setCheckoutOpen} />
		</div>
	);
};

export default CartSummary;
