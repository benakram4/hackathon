"use client";

import { redirect } from "next/navigation";
import React, { useState } from "react";

import { ID } from "node-appwrite";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/cart-context";
import {
	createUserOrdersHistory,
	updateUserImpact,
} from "@/lib/database/actions";
import { type OrderSwapHistory, type UserOrders } from "@/types";

import ConfettiEffect from "./confettie-effect";

interface CheckoutModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const CheckoutModal = ({ open, onOpenChange }: CheckoutModalProps) => {
	const { items, subtotal, getImpactMetrics } = useCart();
	const [orderPlaced, setOrderPlaced] = useState(false);

	// Demo hardcoded values
	const orderID = ID.unique();
	const shippingFee = 4.99;
	const tax = subtotal * 0.13; // 13% tax
	const total = subtotal + shippingFee + tax;

	const userOrder: UserOrders = {
		$id: orderID,
		$createdAt: new Date().toISOString(),
		userId: "",
		items: items.length,
		swaps: items
			.map((item) => {
				if (!item.swapType) return null;
				const newSwap: OrderSwapHistory = {
					$id: ID.unique(),
					$createdAt: new Date().toISOString(),
					orderId: orderID,
					originalProduct: item.product.name,
					swappedProduct: item.swappedFor?.name || "",
					co2: 6.4, // mocked
					waste: 5, // mocked
					water: 3.2, // mocked
				};
				return newSwap;
			})
			.filter((swap): swap is OrderSwapHistory => swap !== null),
		total: total,
		status: "pending",
	};

	const handleCheckout = async (e: React.FormEvent) => {
		e.preventDefault();

		// In a real app, this would connect to a payment processor
		setOrderPlaced(true);
		await createUserOrdersHistory(userOrder);
		await updateUserImpact({
			$id: "",
			userId: "",
			co2: getImpactMetrics().co2Saved as unknown as number,
			water: getImpactMetrics().waterSaved as unknown as number,
			waste: getImpactMetrics().wasteReduced as unknown as number,
		});
		toast.success("Order placed successfully!");

		// This would normally be handled by the payment success callback
		setTimeout(() => {
			onOpenChange(false);
			// Reset after modal closes
			setTimeout(() => setOrderPlaced(false), 500);

			// Navigate to products page after a delay
			setTimeout(() => {
				redirect("/products");
			}, 2000);
		}, 3000);
	};

	return (
		<>
			<ConfettiEffect trigger={orderPlaced} />
			<Dialog
				open={open}
				onOpenChange={(isOpen) => {
					if (!orderPlaced) {
						onOpenChange(isOpen);
					}
				}}>
				<DialogContent className="sm:max-w-[500px]">
					<DialogHeader>
						<DialogTitle>Checkout</DialogTitle>
					</DialogHeader>

					<form
						onSubmit={(e) => {
							void handleCheckout(e);
						}}
						className="space-y-6">
						{/* Shipping Address (pre-filled for demo) */}
						<div className="space-y-4">
							<h3 className="font-medium">Shipping Address</h3>
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-2">
									<Label htmlFor="name">Full Name</Label>
									<Input id="name" defaultValue="John Doe" required />
								</div>
								<div className="col-span-2">
									<Label htmlFor="address">Address</Label>
									<Input id="address" defaultValue="123 Eco Street" required />
								</div>
								<div>
									<Label htmlFor="city">City</Label>
									<Input id="city" defaultValue="Portland" required />
								</div>
								<div>
									<Label htmlFor="zip">Zip Code</Label>
									<Input id="zip" defaultValue="97210" required />
								</div>
								<div className="col-span-2">
									<Label htmlFor="state">State</Label>
									<Input id="state" defaultValue="Oregon" required />
								</div>
							</div>
						</div>

						{/* Payment Method */}
						<div className="space-y-4">
							<h3 className="font-medium">Payment Method</h3>
							<RadioGroup defaultValue="card" className="space-y-3">
								<div className="flex items-center space-x-2 rounded-md border p-3">
									<RadioGroupItem value="card" id="card" />
									<Label htmlFor="card" className="flex-1 cursor-pointer">
										Credit Card
									</Label>
								</div>
								<div className="flex items-center space-x-2 rounded-md border p-3">
									<RadioGroupItem value="paypal" id="paypal" />
									<Label htmlFor="paypal" className="flex-1 cursor-pointer">
										PayPal
									</Label>
								</div>
							</RadioGroup>

							{/* Credit Card Details (pre-filled for demo) */}
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-2">
									<Label htmlFor="card-number">Card Number</Label>
									<Input
										id="card-number"
										defaultValue="4242 4242 4242 4242"
										required
									/>
								</div>
								<div>
									<Label htmlFor="expiry">Expiry Date</Label>
									<Input id="expiry" defaultValue="12/25" required />
								</div>
								<div>
									<Label htmlFor="cvc">CVC</Label>
									<Input id="cvc" defaultValue="123" required />
								</div>
							</div>
						</div>

						{/* Order Summary */}
						<div className="space-y-2 border-t pt-4">
							<div className="flex justify-between text-sm">
								<span>Subtotal ({items.length} items)</span>
								<span>${subtotal.toFixed(2)}</span>
							</div>
							<div className="flex justify-between text-sm">
								<span>Shipping</span>
								<span>${shippingFee.toFixed(2)}</span>
							</div>
							<div className="flex justify-between text-sm">
								<span>Tax</span>
								<span>${tax.toFixed(2)}</span>
							</div>
							<div className="flex justify-between border-t pt-2 text-base font-semibold">
								<span>Total</span>
								<span>${total.toFixed(2)}</span>
							</div>
						</div>

						<DialogFooter className="pt-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => !orderPlaced && onOpenChange(false)}
								disabled={orderPlaced}>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={orderPlaced || items.length === 0}>
								{orderPlaced ? "Processing..." : "Place Order"}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default CheckoutModal;
