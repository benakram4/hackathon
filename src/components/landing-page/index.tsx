import BlogPosts from "./blog-posts";
import Hero from "./hero";
import ImpactMetrics from "./impact-metrics";
import ProductShowcase from "./product-showcase";
import TrendingProducts from "./trending-products";

export default function LandingPage() {
	return (
		<>
			<Hero />
			<ProductShowcase />
			<TrendingProducts />
			<ImpactMetrics />
			<BlogPosts />
		</>
	);
}
