import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

import { getWalmartItem } from "@/lib/walmart/api";

import ProductDetails from "./product-details";

export default async function ProductPage({
	params,
}: {
	params: Promise<{ upc: string }>;
}) {
	const queryClient = new QueryClient();
	const { upc } = await params;

	await queryClient.prefetchQuery({
		queryKey: ["item", upc],
		queryFn: () => getWalmartItem(upc),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="flex min-h-screen items-center justify-center">
				<ProductDetails upc={upc} />
			</div>
		</HydrationBoundary>
	);
}
