import { useRef } from "react";

import { ChevronLeft, ChevronRight, Leaf, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trendingProducts } from "@/data/products";

const TrendingProducts = () => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const { current } = scrollContainerRef;
			const scrollAmount =
				direction === "left"
					? -current.offsetWidth / 1.5
					: current.offsetWidth / 1.5;
			current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	};

	return (
		<section id="trending" className="section-padding relative bg-white">
			<div className="container mx-auto px-4">
				<div className="mb-12 flex flex-col justify-between md:flex-row md:items-end">
					<div>
						<Badge variant="outline" className="mb-3">
							Popular Items
						</Badge>
						<h2 className="mb-3 text-3xl font-bold md:text-4xl">
							Trending <span className="text-primary">Eco</span> Products
						</h2>
						<p className="text-muted-foreground max-w-2xl">
							Discover what eco-conscious shoppers are loving right now
						</p>
					</div>
					<div className="mt-6 flex gap-2 md:mt-0">
						<Button
							variant="outline"
							size="icon"
							onClick={() => scroll("left")}
							className="h-10 w-10 rounded-full">
							<ChevronLeft className="h-5 w-5" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							onClick={() => scroll("right")}
							className="h-10 w-10 rounded-full">
							<ChevronRight className="h-5 w-5" />
						</Button>
					</div>
				</div>

				<div className="relative">
					<div className="from-background pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent" />
					<div
						ref={scrollContainerRef}
						className="hide-scrollbar flex gap-6 overflow-x-auto pb-8">
						{trendingProducts.map((product) => (
							<div
								key={product.id}
								className="group w-[280px] flex-shrink-0 overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:shadow-md">
								<div className="relative h-[200px] overflow-hidden">
									{product.sustainability.organicCertified && (
										<Badge className="bg-primary/90 absolute top-3 left-3 z-10 backdrop-blur-sm">
											<Leaf className="mr-1 h-3 w-3" />
											Organic
										</Badge>
									)}
									{/* TODO change to next image when mock data changed */}
									<img
										src={product.image}
										alt={product.name}
										className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								</div>
								<div className="p-4">
									<div className="mb-2 flex items-start justify-between">
										<h3 className="line-clamp-1 font-medium">{product.name}</h3>
										<div className="flex items-center">
											<Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
											<span className="ml-1 text-xs">{product.rating}</span>
										</div>
									</div>
									<p className="text-muted-foreground mb-3 line-clamp-2 h-10 text-sm">
										{product.description}
									</p>
									<div className="mb-3 flex flex-wrap gap-1">
										{product.tags.slice(0, 3).map((tag) => (
											<span
												key={tag}
												className="bg-secondary rounded-full px-2 py-0.5 text-xs">
												{tag}
											</span>
										))}
									</div>
									<div className="flex items-center justify-between">
										<span className="font-semibold">
											${product.price.toFixed(2)}
										</span>
										<Button size="sm" variant="outline">
											Add to Cart
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="from-background pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16 bg-gradient-to-l to-transparent" />
				</div>
			</div>
		</section>
	);
};

export default TrendingProducts;
