"use client";

import { useEffect, useState } from "react";

import MainNav from "@/components/main-nav";
import { Button } from "@/components/ui/button";

const url = process.env.NEXT_PUBLIC_PROD_URL || "http://localhost:3000";

export default function Home() {
	// TODO this us just for testing we should NOT so much data in the state (2.65MB) which could be fetched in teh server
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [data, setData] = useState<any>(null);

	useEffect(() => {
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
	}, []);
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
