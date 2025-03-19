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

// Mock order data
const orders = [
	{
		id: "#ECO-10012",
		date: "2023-06-15T12:30:00",
		status: "Delivered",
		items: 5,
		total: 89.99,
		swaps: 2,
	},
	{
		id: "#ECO-10011",
		date: "2023-05-20T14:45:00",
		status: "Delivered",
		items: 3,
		total: 45.5,
		swaps: 1,
	},
	{
		id: "#ECO-10010",
		date: "2023-04-05T09:15:00",
		status: "Delivered",
		items: 2,
		total: 28.75,
		swaps: 0,
	},
];
type OrderHistorySectionProps = {
	user: User;
};
const OrderHistorySection = ({ user }: OrderHistorySectionProps) => {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Order History</h2>
				<Badge variant="outline" className="text-sm">
					{orders.length} Orders
				</Badge>
			</div>

			{orders.length === 0 ? (
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
							{orders.map((order) => (
								<TableRow key={order.id}>
									<TableCell className="font-medium">{order.id}</TableCell>
									<TableCell>
										{new Date(order.date).toLocaleDateString()}
									</TableCell>
									<TableCell>{order.items}</TableCell>
									<TableCell>{order.swaps}</TableCell>
									<TableCell>${order.total.toFixed(2)}</TableCell>
									<TableCell>
										<Badge
											variant={
												order.status === "Delivered" ? "default" : "secondary"
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
							<TableRow>
								<TableCell className="font-medium">#ECO-10012</TableCell>
								<TableCell>Regular Beef Patties</TableCell>
								<TableCell>Plant-Based Patties</TableCell>
								<TableCell>-4.2kg CO2</TableCell>
								<TableCell>Jun 15, 2023</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">#ECO-10012</TableCell>
								<TableCell>Plastic Bottled Water</TableCell>
								<TableCell>Filtered Tap Water</TableCell>
								<TableCell>-0.8kg CO2</TableCell>
								<TableCell>Jun 15, 2023</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">#ECO-10011</TableCell>
								<TableCell>Regular Milk</TableCell>
								<TableCell>Oat Milk</TableCell>
								<TableCell>-1.9kg CO2</TableCell>
								<TableCell>May 20, 2023</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default OrderHistorySection;
