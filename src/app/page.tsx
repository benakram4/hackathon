"use client";

import MainNav from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { useProductOFF } from "@/hooks/off";
import { useWalmartCategories } from "@/hooks/walmart";

export default function Home() {
	// TODO this us just for testing we should NOT so much data in the state (2.65MB) which could be fetched in teh server

	const {
		data: offProduct,
		isLoading: offProductLoading,
		error: offProductError,
	} = useProductOFF("5000112546415");

	// TODO populate this on the server side, we will need to use this to populate the nav bar
	const {
		data: categoriesData,
		isLoading: categoriesLoading,
		error: categoriesError,
	} = useWalmartCategories();

	return (
		<div className="min-h-screen">
			<MainNav />
			<main className="container mx-auto px-4 pt-24">
				<section className="py-12 md:py-24">
					<div className="text-center">
						<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
							Shop Smarter,
							<span className="text-green-600">Live Greener</span>
						</h1>
						<p className="text-muted-foreground mx-auto mt-6 max-w-3xl text-lg">
							Add your regular items from retailers like Walmart and Amazon to
							your cart. We&apos;ll suggest healthier, more sustainable
							alternatives that are better for you and the planet.
						</p>
						<div className="mt-8 flex justify-center gap-4">
							<Button size="lg" className="bg-green-600 hover:bg-green-700">
								Start Shopping
							</Button>
							<Button size="lg" variant="outline">
								How It Works
							</Button>
						</div>
					</div>
				</section>
				<div>
					{offProductLoading && <div>Loading product data...</div>}
					{offProductError && (
						<div className="text-red-500">Error: {offProductError.message}</div>
					)}
					{offProduct && (
						<div>
							<h2 className="text-2xl font-bold">Product</h2>
							<p className="text-xl">
								{offProduct.product_name ||
									offProduct.product_name_en ||
									"No product name available"}
							</p>
							{/* You can also show the abbreviated name if available */}
							{offProduct.abbreviated_product_name && (
								<p className="text-sm text-gray-500">
									Also known as: {offProduct.abbreviated_product_name}
								</p>
							)}
							<pre className="max-h-64 overflow-auto bg-gray-100 p-2 text-xs">
								{JSON.stringify(offProduct, null, 2)}
							</pre>
						</div>
					)}
					<div>
						{categoriesLoading && <div>Loading categories...</div>}
						{categoriesError && (
							<div className="text-red-500">Error loading categories</div>
						)}
						{categoriesData && (
							<div>
								<h2 className="text-2xl font-bold">Categories</h2>
								<ul>
									{categoriesData?.map(
										(category: { id: string; name: string }) => (
											<li key={category.id}>
												{category.name} | {category.id}
											</li>
										)
									)}
								</ul>
								<pre className="mb-6 max-h-[50rem] overflow-auto bg-gray-100 p-2 text-xs">
									{JSON.stringify(categoriesData, null, 2)}
								</pre>
							</div>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}
