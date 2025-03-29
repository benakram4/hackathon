import { z } from "zod";

export const addressSchema = z.object({
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
