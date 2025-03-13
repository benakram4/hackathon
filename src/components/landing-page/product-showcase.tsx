import { useState } from "react";

import {
	ArrowRight,
	BarChart4,
	ChevronLeft,
	ChevronRight,
	Droplets,
	Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { productAlternatives } from "@/data/products";
import { cn } from "@/lib/utils";

const ProductShowcase = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrev = () => {
		setCurrentIndex((prev) =>
			prev === 0 ? productAlternatives.length - 1 : prev - 1
		);
	};

	const handleNext = () => {
		setCurrentIndex((prev) =>
			prev === productAlternatives.length - 1 ? 0 : prev + 1
		);
	};

	const currentAlternative = productAlternatives[currentIndex];

	return (
		<section
			id="alternatives"
			className="section-padding bg-secondary/50 relative">
			<div className="relative container mx-auto px-4">
				<div className="mb-16 flex flex-col items-center text-center">
					<Badge variant="outline" className="mb-3">
						Swap & Save
					</Badge>
					<h2 className="mb-4 text-3xl font-bold md:text-4xl">
						Discover <span className="text-primary">Sustainable</span>{" "}
						Alternatives
					</h2>
					<p className="text-muted-foreground max-w-2xl">
						See how simple swaps to your regular shopping list can have a big
						impact on your health and the environment
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-12">
					{/* Left side - Regular product */}
					<div className="flex flex-col overflow-hidden rounded-2xl border bg-white p-6 shadow-sm lg:col-span-5">
						<div className="mb-4">
							<Badge variant="outline" className="text-muted-foreground mb-2">
								Regular Choice
							</Badge>
							<h3 className="mb-1 text-2xl font-medium">
								{currentAlternative.regularProduct.name}
							</h3>
							<p className="text-muted-foreground mb-4 text-sm">
								{currentAlternative.regularProduct.description}
							</p>
							<div className="bg-muted mb-4 rounded-lg p-4">
								<p className="text-sm font-medium">Environmental Impact</p>
								<div className="mt-2 space-y-2">
									<div className="flex items-center justify-between">
										<span className="text-muted-foreground text-xs">
											Carbon Footprint:
										</span>
										<Badge
											variant={
												currentAlternative.regularProduct.sustainability
													.carbonFootprint === "high"
													? "destructive"
													: "outline"
											}>
											{
												currentAlternative.regularProduct.sustainability
													.carbonFootprint
											}
										</Badge>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-muted-foreground text-xs">
											Packaging:
										</span>
										<span className="text-xs">
											{
												currentAlternative.regularProduct.sustainability
													.packaging
											}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-muted-foreground text-xs">
											Locally Sourced:
										</span>
										<span className="text-xs">
											{currentAlternative.regularProduct.sustainability
												.locallySourced
												? "Yes"
												: "No"}
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-lg">
							{/* TODO change to next image when mock data changed */}
							<img
								src={currentAlternative.regularProduct.image}
								alt={currentAlternative.regularProduct.name}
								className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
							/>
						</div>
						<div className="mt-auto">
							<div className="flex items-center justify-between">
								<span className="text-lg font-semibold">
									${currentAlternative.regularProduct.price.toFixed(2)}
								</span>
								<Button variant="outline" size="sm">
									View Details
								</Button>
							</div>
						</div>
					</div>

					{/* Middle - Swap arrow */}
					<div className="flex items-center justify-center lg:col-span-2">
						<div className="bg-primary text-primary-foreground animate-pulse-slow relative flex h-16 w-16 items-center justify-center rounded-full">
							<ArrowRight className="h-8 w-8" />
						</div>
					</div>

					{/* Right side - Sustainable alternative */}
					<div className="border-primary/20 flex flex-col overflow-hidden rounded-2xl border bg-white p-6 shadow-sm lg:col-span-5">
						<div className="mb-4">
							<Badge className="bg-primary mb-2">Better Alternative</Badge>
							<h3 className="mb-1 text-2xl font-medium">
								{currentAlternative.sustainableAlternative.name}
							</h3>
							<p className="text-muted-foreground mb-4 text-sm">
								{currentAlternative.sustainableAlternative.description}
							</p>
							<div className="bg-primary/5 border-primary/10 mb-4 rounded-lg border p-4">
								<p className="text-primary text-sm font-medium">
									Environmental Benefits
								</p>
								<div className="mt-2 space-y-2">
									<div className="flex items-center gap-2">
										<BarChart4 className="text-primary h-4 w-4 flex-shrink-0" />
										<span className="text-xs">
											{currentAlternative.impactSavings.co2Reduction}
										</span>
									</div>
									<div className="flex items-center gap-2">
										<Droplets className="text-primary h-4 w-4 flex-shrink-0" />
										<span className="text-xs">
											{currentAlternative.impactSavings.waterSaved}
										</span>
									</div>
									<div className="flex items-center gap-2">
										<Trash2 className="text-primary h-4 w-4 flex-shrink-0" />
										<span className="text-xs">
											{currentAlternative.impactSavings.wasteReduced}
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-lg">
							<div className="from-primary/10 absolute inset-0 z-10 bg-gradient-to-tr to-transparent" />
							{/* TODO change to next image when mock data changed */}
							<img
								src={currentAlternative.sustainableAlternative.image}
								alt={currentAlternative.sustainableAlternative.name}
								className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
							/>
						</div>
						<div className="mt-auto">
							<div className="flex items-center justify-between">
								<span className="text-lg font-semibold">
									${currentAlternative.sustainableAlternative.price.toFixed(2)}
								</span>
								<Button size="sm">Swap Now</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Navigation Controls */}
				<div className="mt-12 flex justify-center gap-4">
					<Button
						variant="outline"
						size="icon"
						onClick={handlePrev}
						className="h-10 w-10 rounded-full">
						<ChevronLeft className="h-5 w-5" />
					</Button>
					<div className="flex items-center gap-2">
						{productAlternatives.map((_, idx) => (
							<button
								key={idx}
								onClick={() => setCurrentIndex(idx)}
								className={cn(
									"h-2.5 w-2.5 rounded-full transition-all",
									idx === currentIndex
										? "bg-primary w-6"
										: "bg-primary/30 hover:bg-primary/50"
								)}
							/>
						))}
					</div>
					<Button
						variant="outline"
						size="icon"
						onClick={handleNext}
						className="h-10 w-10 rounded-full">
						<ChevronRight className="h-5 w-5" />
					</Button>
				</div>
			</div>
		</section>
	);
};

export default ProductShowcase;
