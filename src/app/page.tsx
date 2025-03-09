"use client";

import { useEffect, useState } from "react";

import MainNav from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { ProductV2 } from "@/lib/off/src/main";
import { useOFF } from "@/providers/off-provider";

const url = process.env.NEXT_PUBLIC_PROD_URL || "http://localhost:3000";

export default function Home() {
	// TODO this us just for testing we should NOT so much data in the state (2.65MB) which could be fetched in teh server
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [offData, setOffData] = useState<ProductV2 | null>(null);
	const off = useOFF();

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setLoading(true);
				setError(null);
				const product = await off.getProduct("5000112546415");
				console.log("Raw product data:", product);
				if (product) {
					setOffData(product);
				} else {
					setError("Product not found");
				}
			} catch (err) {
				console.error("Error fetching from off:", err);
				setError(err instanceof Error ? err.message : "Unknown error");
			} finally {
				setLoading(false);
			}
		};
		const fetchCategories = async () => {
			try {
				const response = await fetch(`${url}/api/walmart/categories`);
				const result = await response.json();
				setData(result);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategories();
		fetchProduct();
	}, [off]);
	console.log("xxxxxxxxxx", offData?.image_front_small_url);
	console.log("XXXX", data);
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
					{loading && <div>Loading product data...</div>}
					{error && <div className="text-red-500">Error: {error}</div>}
					{offData && (
						<div>
							<h2 className="text-2xl font-bold">Product</h2>
							<p className="text-xl">
								{offData.product_name ||
									offData.product_name_en ||
									"No product name available"}
							</p>
							{/* You can also show the abbreviated name if available */}
							{offData.abbreviated_product_name && (
								<p className="text-sm text-gray-500">
									Also known as: {offData.abbreviated_product_name}
								</p>
							)}
							<pre className="max-h-64 overflow-auto bg-gray-100 p-2 text-xs">
								{JSON.stringify(offData, null, 2)}
							</pre>
						</div>
					)}
					{data && (
						<div>
							<h2 className="text-2xl font-bold">Categories</h2>
							<ul>
								{data?.categories?.map(
									(category: { id: string; name: string }) => (
										<li key={category.id}>{category.name}</li>
									)
								)}
							</ul>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
