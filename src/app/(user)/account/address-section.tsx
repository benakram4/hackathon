"use client";

import { useEffect, useState } from "react";

import { Pencil, Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type User } from "@/lib/auth";
import { getUserAddress, updateUserAddress } from "@/lib/database";
import { type UserAddress } from "@/types/database";

type AddressSectionProps = {
	user: User;
};
const AddressSection = ({ user }: AddressSectionProps) => {
	const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
	const [editAddress, setEditAddress] = useState<UserAddress | null>(null);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		try {
			const fetchUserAddress = async () => {
				const data = await getUserAddress(user.$id);
				setUserAddress(data);
			};
			void fetchUserAddress();
		} catch (error) {
			console.error(error);
		}
	}, [user.$id]);

	const handleEdit = () => {
		setEditAddress(
			userAddress ? { ...userAddress, $id: userAddress.$id || "" } : null,
		);
		setIsEditing(true);
	};

	const handleCancel = () => {
		setEditAddress(null);
		setIsEditing(false);
	};

	const handleSave = async () => {
		if (!editAddress) return;
		await updateUserAddress(user.$id, editAddress);
		setUserAddress(editAddress);
		setIsEditing(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setEditAddress((prev) => (prev ? { ...prev, [name]: value } : null));
	};

	console.log("userAddress", userAddress);
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Shipping Address</h2>
				{isEditing ? (
					<div className="flex gap-2">
						<Button variant="destructive" onClick={handleCancel}>
							<X className="mr-2 h-4 w-4" />
							Cancel
						</Button>
						<Button
							onClick={() => {
								void handleSave();
							}}>
							<Save className="mr-2 h-4 w-4" />
							Save Changes
						</Button>
					</div>
				) : (
					<Button onClick={handleEdit}>
						<Pencil className="mr-2 h-4 w-4" />
						Edit Address
					</Button>
				)}
			</div>

			<div className="grid gap-4 md:grid-cols-1">
				<Card key={userAddress?.$id}>
					<CardHeader className="pb-2">
						<div className="flex items-start justify-between">
							<div>
								<CardTitle className="text-lg">{userAddress?.type}</CardTitle>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						{!isEditing ? (
							<div className="space-y-1 text-sm">
								<p>
									{userAddress?.number} {userAddress?.line1}
								</p>
								{userAddress?.line2 && <p>{userAddress?.line2}</p>}
								<p>
									{userAddress?.city}, {userAddress?.province}{" "}
									{userAddress?.postalCode}
								</p>
								<p>{userAddress?.country}</p>
							</div>
						) : (
							<form className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="type">Address Type</Label>
									<Select
										name="type"
										value={editAddress?.type || ""}
										onValueChange={(value: string) =>
											setEditAddress((prev) =>
												prev ? { ...prev, type: value } : null,
											)
										}>
										<SelectTrigger id="type">
											<SelectValue placeholder="Select address type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Home">Home</SelectItem>
											<SelectItem value="Apartment">Apartment</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="number">Number</Label>
									<Input
										id="number"
										name="number"
										value={editAddress?.number || ""}
										onChange={handleChange}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="line1">Address Line 1</Label>
									<Input
										id="line1"
										name="line1"
										value={editAddress?.line1 || ""}
										onChange={handleChange}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="line2">Address Line 2 (Optional)</Label>
									<Input
										id="line2"
										name="line2"
										value={editAddress?.line2 || ""}
										onChange={handleChange}
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="city">City</Label>
										<Input
											id="city"
											name="city"
											value={editAddress?.city || ""}
											onChange={handleChange}
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="province">Province/State</Label>
										<Input
											id="province"
											name="province"
											value={editAddress?.province || ""}
											onChange={handleChange}
										/>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="postalCode">Postal/Zip Code</Label>
										<Input
											id="postalCode"
											name="postalCode"
											value={editAddress?.postalCode || ""}
											onChange={handleChange}
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="country">Country</Label>
										<Input
											id="country"
											name="country"
											value={editAddress?.country || ""}
											onChange={handleChange}
										/>
									</div>
								</div>
							</form>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default AddressSection;
