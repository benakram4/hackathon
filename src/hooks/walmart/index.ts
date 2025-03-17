import { type QueryClient, useQuery } from "@tanstack/react-query";

import { type WalmartCategory } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_PROD_URL || "http://localhost:3000";

// Walmart query keys factory
export const walmartKeys = {
	all: ["walmart"] as const,
	categories: () => [...walmartKeys.all, "categories"] as const,
};

export async function fetchWalmartCategories({
	signal,
}: {
	signal: AbortSignal;
}): Promise<WalmartCategory[]> {
	const response = await fetch(`${baseUrl}/api/walmart/categories`, {
		method: "GET",
		signal: signal,
	});
	if (!response.ok) {
		throw new Error("Failed to fetch categories");
	}
	return await response.json();
}

// Hook to fetch categories from Walmart API
export function useWalmartCategories() {
	return useQuery({
		queryKey: walmartKeys.categories(),
		queryFn: async ({ signal }) => await fetchWalmartCategories({ signal }),
		staleTime: Infinity,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
}

export async function preFetchWalmartCategories(queryClient: QueryClient) {
	return await queryClient.prefetchQuery({
		queryKey: walmartKeys.categories(),
		queryFn: fetchWalmartCategories,
	});
}
