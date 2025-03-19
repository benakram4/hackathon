import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

import { getItem } from "@/lib/walmart/api";

import ProductDetails from "./product-details";

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const queryClient = new QueryClient();
	const { id } = await params;

	await queryClient.prefetchQuery({
		queryKey: ["item", id],
		queryFn: () => getItem(id),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="flex min-h-screen items-center justify-center">
				<ProductDetails itemId={id} />
			</div>
		</HydrationBoundary>
	);
}
