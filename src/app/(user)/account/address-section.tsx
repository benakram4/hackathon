"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { type User } from "@/lib/auth";
import { getUserAddress, updateUserAddress } from "@/lib/database";
import { type UserAddress } from "@/types/database";

type AddressSectionProps = {
	user: User;
};
const addressSchema = z.object({
	type: z.enum(["Home", "Apartment"], {
		required_error: "Please select an address type",
	}),
	number: z.string().min(1, "Number is required"),
	line1: z.string().min(1, "Address line 1 is required"),
	line2: z.string().optional(),
	city: z.string().min(1, "City is required"),
	province: z.string().min(1, "Province/State is required"),
	postalCode: z.string().min(1, "Postal/Zip code is required"),
	country: z.string().min(1, "Country is required"),
});

export type AddressSchema = z.infer<typeof addressSchema>;
const AddressSection = ({ user }: AddressSectionProps) => {
	const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [saveError, setSaveError] = useState<string | null>(null);

	// Initialize the form
	const form = useForm<AddressSchema>({
		resolver: zodResolver(addressSchema),
		defaultValues: {
			type: undefined,
			number: "",
			line1: "",
			line2: "",
			city: "",
			province: "",
			postalCode: "",
			country: "",
		},
		mode: "onBlur",
	});

	useEffect(() => {
		setIsLoading(true);
		try {
			const fetchUserAddress = async () => {
				const data = await getUserAddress(user.$id);
				setUserAddress(data);

				// If we have address data, populate the form
				if (data) {
					form.reset({
						type: data.type as "Home" | "Apartment",
						number: data.number?.toString() || "",
						line1: data.line1 || "",
						line2: data.line2 || "",
						city: data.city || "",
						province: data.province || "",
						postalCode: data.postalCode || "",
						country: data.country || "",
					});
					setIsLoading(false);
				}
			};
			void fetchUserAddress();
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	}, [user.$id, form]);

	const handleEdit = () => {
		if (userAddress) {
			form.reset({
				type: userAddress.type as "Home" | "Apartment",
				number: userAddress.number?.toString() || "",
				line1: userAddress.line1 || "",
				line2: userAddress.line2 || "",
				city: userAddress.city || "",
				province: userAddress.province || "",
				postalCode: userAddress.postalCode || "",
				country: userAddress.country || "",
			});
		} else {
			form.reset({
				type: undefined,
				number: "",
				line1: "",
				line2: "",
				city: "",
				province: "",
				postalCode: "",
				country: "",
			});
		}
		setIsEditing(true);
		setSaveError(null);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setSaveError(null);
		form.reset();
	};

	async function onSubmit(data: AddressSchema) {
		try {
			setIsSaving(true);
			setSaveError(null);

			const sanitizedAddress = {
				$id: userAddress?.$id || "",
				userId: user.$id,
				...data,
				number: parseInt(data.number, 10),
				line2: data.line2 || "",
			};

			await updateUserAddress(user.$id, sanitizedAddress);
			setUserAddress(sanitizedAddress);
			setIsEditing(false);
		} catch (error) {
			console.error(error);
			setSaveError("Failed to save address. Please try again.");
		} finally {
			setIsSaving(false);
		}
	}

	// Skeleton loader component for the address card
	const AddressSkeleton = () => (
		<div className="space-y-2 py-4">
			<Skeleton className="mb-3 h-5 w-24" />
			<Skeleton className="h-4 w-12" />
			<Skeleton className="mt-2 h-4 w-3/4" />
			<Skeleton className="mt-2 h-4 w-1/2" />
			<div className="mt-3 flex space-x-2">
				<Skeleton className="h-4 w-1/4" />
				<Skeleton className="h-4 w-1/4" />
				<Skeleton className="h-4 w-1/4" />
			</div>
			<Skeleton className="mt-2 h-4 w-1/3" />
		</div>
	);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Address</h2>
				{isLoading ? (
					<Skeleton className="h-10 w-32" />
				) : isEditing ? (
					<div className="flex gap-2">
						<Button
							variant="destructive"
							onClick={handleCancel}
							disabled={isSaving}>
							<X className="mr-2 h-4 w-4" />
							Cancel
						</Button>
						<Button
							type="submit"
							form="address-form"
							disabled={isSaving}
							className={isSaving ? "cursor-not-allowed opacity-70" : ""}>
							{isSaving ? (
								<>
									<svg
										className="mr-2 h-4 w-4 animate-spin"
										viewBox="0 0 24 24">
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
											fill="none"></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Saving...
								</>
							) : (
								<>
									<Save className="mr-2 h-4 w-4" />
									Save Changes
								</>
							)}
						</Button>
					</div>
				) : (
					<Button onClick={handleEdit}>
						<Pencil className="mr-2 h-4 w-4" />
						{userAddress ? "Edit Address" : "Add Address"}
					</Button>
				)}
			</div>

			<div className="grid gap-4 md:grid-cols-1">
				<Card key={userAddress?.$id}>
					<CardHeader className="pb-2">
						<div className="flex items-start justify-between">
							<div>
								{isLoading ? (
									<Skeleton className="h-6 w-28" />
								) : (
									<CardTitle className="text-lg">
										{userAddress?.type || "Address"}
									</CardTitle>
								)}
							</div>
						</div>
					</CardHeader>
					<CardContent>
						{isLoading ? (
							<AddressSkeleton />
						) : !isEditing ? (
							userAddress ? (
								<div className="space-y-1 text-sm">
									<p>{userAddress.number}</p>
									<p>{userAddress.line1}</p>
									{userAddress.line2 && <p>{userAddress.line2}</p>}
									<p>
										{userAddress.city}, {userAddress.province}{" "}
										{userAddress.postalCode}
									</p>
									<p>{userAddress.country}</p>
								</div>
							) : (
								<div className="text-muted-foreground py-4 text-center">
									<p>You haven&apos;t provided your address yet.</p>
									<p>Click &quot;Add Address&quot; to add your address.</p>
								</div>
							)
						) : (
							<Form {...form}>
								<form
									id="address-form"
									// eslint-disable-next-line
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-4">
									{saveError && (
										<div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-700">
											{saveError}
										</div>
									)}

									<FormField
										control={form.control}
										name="type"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Address Type <span className="text-red-500">*</span>
												</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value ?? "Home"}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select address type" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="Home">Home</SelectItem>
														<SelectItem value="Apartment">Apartment</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="number"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Number <span className="text-red-500">*</span>
												</FormLabel>
												<FormControl>
													<Input type="number" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="line1"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Address Line 1 <span className="text-red-500">*</span>
												</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="line2"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Address Line 2 (Optional)</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className="grid grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="city"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														City <span className="text-red-500">*</span>
													</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="province"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Province/State{" "}
														<span className="text-red-500">*</span>
													</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="postalCode"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Postal/Zip Code{" "}
														<span className="text-red-500">*</span>
													</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="country"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Country <span className="text-red-500">*</span>
													</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</form>
							</Form>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default AddressSection;
