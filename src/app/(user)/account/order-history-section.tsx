"use client";

import { useEffect, useState } from "react";

import { Eye, Package } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { type User } from "@/lib/auth";
import { getOrderHistory } from "@/lib/database/actions";
import { type OrderSwapHistory, type UserOrders } from "@/types";

type OrderHistorySectionProps = {
	user: User;
};
const OrderHistorySection = ({ user }: OrderHistorySectionProps) => {
	const [orderHistory, setOrderHistory] = useState<UserOrders[] | null>(null);
	const [swapsHistory, setSwapsHistory] = useState<OrderSwapHistory[] | null>(
		null,
	);

	useEffect(() => {
		const fetchOrderHistory = async () => {
			const data = await getOrderHistory(user.$id);
			setOrderHistory(data);
		};

		void fetchOrderHistory();
	}, [user.$id]);

	useEffect(() => {
		if (orderHistory) {
			const allSwaps = orderHistory.flatMap((order) => order.swaps);
			setSwapsHistory(allSwaps);
		}
	}, [orderHistory]);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Order History</h2>
				<Badge variant="outline" className="text-sm">
					{orderHistory?.length} Orders
				</Badge>
			</div>

			{orderHistory?.length === 0 ? (
				<div className="rounded-lg border py-12 text-center">
					<Package className="text-muted-foreground/50 mx-auto h-12 w-12" />
					<h3 className="mt-4 text-lg font-medium">No orders yet</h3>
					<p className="text-muted-foreground mt-1 text-sm">
						Once you place an order, it will appear here
					</p>
					<Button className="mt-4">Start Shopping</Button>
				</div>
			) : (
				<div className="overflow-hidden rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Order ID</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Items</TableHead>
								<TableHead>Swaps</TableHead>
								<TableHead>Total</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orderHistory?.map((order) => (
								<TableRow key={order.$id}>
									<TableCell className="font-medium">{order.$id}</TableCell>
									<TableCell>
										{new Date(order.$createdAt).toLocaleDateString()}
									</TableCell>
									<TableCell>{order.items}</TableCell>
									<TableCell>{order.swaps.length}</TableCell>
									<TableCell>${order.total.toFixed(2)}</TableCell>
									<TableCell>
										<Badge
											variant={
												order.status === "delivered"
													? "default"
													: order.status === "pending"
														? "secondary"
														: "destructive"
											}>
											{order.status}
										</Badge>
									</TableCell>
									<TableCell className="text-right">
										<Button variant="ghost" size="sm">
											<Eye className="mr-2 h-4 w-4" />
											View
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}

			<div className="mt-8">
				<h3 className="mb-4 text-xl font-semibold">Swap History</h3>
				<div className="overflow-hidden rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Order ID</TableHead>
								<TableHead>Original Product</TableHead>
								<TableHead>Swapped For</TableHead>
								<TableHead>Impact</TableHead>
								<TableHead>Date</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{swapsHistory?.map((swap) => (
								<TableRow key={swap.$id}>
									<TableCell className="font-medium">
										{/*{swap.orderId}*/}
										{/*there is a bug with swap.orderId being undefined. showing swap.$id for now... */}
										{swap.$id}{" "}
									</TableCell>
									<TableCell>{swap.originalProduct}</TableCell>
									<TableCell>{swap.swappedProduct}</TableCell>
									<TableCell>-{swap.co2}kg CO2</TableCell>
									<TableCell>
										{new Date(swap.$createdAt).toLocaleDateString()}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default OrderHistorySection;
