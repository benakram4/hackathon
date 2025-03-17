import { useQuery } from "@tanstack/react-query";

import { type ProductV2 } from "@/lib/off/src/main";
import { getOffClient } from "@/providers/get-off-client";

// OpenFoodFacts query keys factory
export const offKeys = {
	all: ["off"] as const,
	products: () => [...offKeys.all, "products"] as const,
	product: (id: string) => [...offKeys.products(), id] as const,
};

// Hook to fetch a product by barcode from OpenFoodFacts
export function useProductOFF(barcode: string) {
	return useQuery({
		queryKey: offKeys.product(barcode),
		queryFn: async () => {
			const off = getOffClient();
			const product = await off.getProduct(barcode);
			if (!product) {
				throw new Error("Product not found");
			}
			return product;
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}
