import { useQuery } from "@tanstack/react-query";

import { WalmartCategory } from "@/types";

// Walmart query keys factory
export const walmartKeys = {
	all: ["walmart"] as const,
	categories: () => [...walmartKeys.all, "categories"] as const,
};

// Hook to fetch categories from Walmart API
export function useWalmartCategories() {
	const baseUrl = process.env.NEXT_PUBLIC_PROD_URL || "http://localhost:3000";

	return useQuery({
		queryKey: walmartKeys.categories(),
		queryFn: async () => {
			const response = await fetch(`${baseUrl}/api/walmart/categories`);
			if (!response.ok) {
				throw new Error("Failed to fetch categories");
			}
			const data = await response.json();
			return data as WalmartCategory[];
		},
		staleTime: 60 * 60 * 1000, // 1 hour since categories don't change often
	});
}
