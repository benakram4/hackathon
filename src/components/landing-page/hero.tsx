import Link from "next/link";

import { ArrowRight, Leaf, ShieldCheck, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

const Hero = () => {
	return (
		<section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-28">
			{/* Background decoration */}
			<div className="bg-primary/5 absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl" />
			<div className="bg-accent/5 absolute -bottom-32 -left-32 h-96 w-96 rounded-full blur-3xl" />

			<div className="relative container mx-auto px-4">
				<div className="mx-auto max-w-4xl text-center">
					{/* Chip/Badge */}
					<div className="bg-secondary text-primary animate-fade-in mb-6 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
						<Leaf className="mr-1.5 h-3.5 w-3.5" />
						<span>Sustainable Shopping Made Simple</span>
					</div>

					{/* Heading */}
					<h1 className="animate-slide-up mb-6 text-4xl font-bold tracking-tight text-balance md:text-6xl">
						Make Better Choices for <span className="text-primary">You</span>{" "}
						and the <span className="text-primary">Planet</span>
					</h1>

					{/* Subheading */}
					<p
						className="text-muted-foreground animate-slide-up mx-auto mb-8 max-w-2xl text-lg text-balance md:text-xl"
						style={{ animationDelay: "100ms" }}>
						Discover eco-friendly alternatives to your regular shopping list
						while reducing your environmental impact and supporting local
						producers.
					</p>

					{/* CTA Buttons */}
					<div
						className="animate-slide-up mb-16 flex flex-row items-center justify-center gap-4 sm:flex-row"
						style={{ animationDelay: "200ms" }}>
						<Link href="/products">
							<Button size="lg" className="group w-full sm:w-auto">
								Shop Now
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 sm:w-auto" />
							</Button>
						</Link>
						<Link href="#alternatives">
							<Button variant="outline" size="lg" className="sm:w-auto">
								Learn More
							</Button>
						</Link>
					</div>

					{/* Benefits */}
					<div
						className="animate-slide-up mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
						style={{ animationDelay: "300ms" }}>
						<div className="flex flex-col items-center">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
								<Leaf className="text-primary h-6 w-6" />
							</div>
							<h3 className="mb-2 text-lg font-medium">
								Eco-Friendly Alternatives
							</h3>
							<p className="text-muted-foreground text-sm">
								Curated sustainable options for your everyday items
							</p>
						</div>

						<div className="flex flex-col items-center">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
								<ShieldCheck className="h-6 w-6 text-amber-500" />
							</div>
							<h3 className="mb-2 text-lg font-medium">Verified Products</h3>
							<p className="text-muted-foreground text-sm">
								All items vetted for sustainability and ethical practices
							</p>
						</div>

						<div className="flex flex-col items-center">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
								<Zap className="h-6 w-6 text-blue-500" />
							</div>
							<h3 className="mb-2 text-lg font-medium">Track Your Impact</h3>
							<p className="text-muted-foreground text-sm">
								See the positive effect of your sustainable choices
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
