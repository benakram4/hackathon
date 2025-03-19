import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { type User } from "@/lib/auth";

type AddressSectionProps = {
	user: User;
};
const AddressSection = ({ user }: AddressSectionProps) => {
	// Mock address data
	const addresses = [
		{
			id: 1,
			type: "Home",
			line1: "123 Eco Street",
			line2: "Apt 456",
			city: "San Francisco",
			state: "CA",
			zipCode: "94107",
			country: "United States",
			isDefault: true,
		},
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Shipping Addresses</h2>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Add New Address
				</Button>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				{addresses.map((address) => (
					<Card key={address.id}>
						<CardHeader className="pb-2">
							<div className="flex items-start justify-between">
								<div>
									<CardTitle className="text-lg">{address.type}</CardTitle>
									<CardDescription>
										{address.isDefault && "Default shipping address"}
									</CardDescription>
								</div>
								{address.isDefault && (
									<span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
										Default
									</span>
								)}
							</div>
						</CardHeader>
						<CardContent>
							<div className="space-y-1 text-sm">
								<p>{address.line1}</p>
								{address.line2 && <p>{address.line2}</p>}
								<p>
									{address.city}, {address.state} {address.zipCode}
								</p>
								<p>{address.country}</p>
							</div>
						</CardContent>
						<CardFooter className="flex justify-between pt-2">
							<Button variant="ghost" size="sm">
								Edit
							</Button>
							{!address.isDefault && (
								<Button variant="ghost" size="sm">
									Set as Default
								</Button>
							)}
						</CardFooter>
					</Card>
				))}

				<Card className="flex min-h-[220px] items-center justify-center border-dashed">
					<Button variant="ghost" className="flex h-full w-full flex-col py-8">
						<Plus className="mb-2 h-8 w-8" />
						<span>Add New Address</span>
					</Button>
				</Card>
			</div>
		</div>
	);
};

export default AddressSection;
