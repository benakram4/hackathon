import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

import ProductCards from "@/components/ProductCard/ProductCards";

const baseUrl = process.env.NEXT_PUBLIC_PROD_URL || "http://localhost:3000";

export default async function PostsPage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["items"],
		queryFn: getItems,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="flex min-h-screen items-center justify-center">
				<ProductCards />
			</div>
		</HydrationBoundary>
	);
}

async function getItems() {
	const response = await fetch(`${baseUrl}/api/walmart/items`, {
		method: "GET",
	});
	if (!response.ok) {
		throw new Error("Failed to fetch items");
	}
	const data = await response.json();
	return data;
}
