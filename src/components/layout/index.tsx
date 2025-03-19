import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { walmartKeys } from "@/hooks";
import { getQueryClient } from "@/providers/get-query-client";

import Footer from "../landing-page/footer";
import SiteHeader from "./main-nav";

const baseUrl = process.env.NEXT_PUBLIC_PROD_URL || "http://localhost:3000";

export async function Layout({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery({
		queryKey: walmartKeys.categories(),
		queryFn: async () => {
			const response = await fetch(`${baseUrl}/api/walmart/categories`, {
				method: "GET",
			});
			if (!response.ok) {
				throw new Error("Failed to fetch categories");
			}

			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return await response.json();
		},
	});
	// Hydrate the pre-fetched state to the client
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<SiteHeader />
			{children}
			<Footer />
		</HydrationBoundary>
	);
}
