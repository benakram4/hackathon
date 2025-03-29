import BlogPosts from "./blog-posts";
import CommonlySwappedProducts from "./commonly-swapped-products";
import Hero from "./hero";
import ImpactMetrics from "./impact-metrics";
import ProductShowcase from "./product-showcase";

export default function LandingPage() {
	return (
		<>
			<Hero />
			<ProductShowcase />
			<CommonlySwappedProducts />
			<ImpactMetrics />
			<BlogPosts />
		</>
	);
}
