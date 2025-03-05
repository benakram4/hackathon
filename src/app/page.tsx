import MainNav from "@/components/main-nav";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
				<div className="min-h-screen">
			<MainNav />
			<main className="container mx-auto px-4 pt-24">
				<section className="py-12 md:py-24">
					<div className="text-center">
						<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
							Shop Smarter, <span className="text-green-600">Live Greener</span>
						</h1>
						<p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
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
			</main>
		</div>
	);
}
