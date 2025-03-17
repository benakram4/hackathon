import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

import ProductCards from "@/app/products/product-cards";
import { getItems } from "@/lib/walmart/api";

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
