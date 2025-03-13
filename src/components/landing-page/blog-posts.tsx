import { ArrowRight, Calendar, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog";

const BlogPosts = () => {
	return (
		<section id="blog" className="section-padding bg-secondary/30">
			<div className="container mx-auto px-4">
				<div className="mb-16 text-center">
					<Badge variant="outline" className="mb-3">
						Eco-Knowledge
					</Badge>
					<h2 className="mb-4 text-3xl font-bold md:text-4xl">
						Latest from our <span className="text-primary">Blog</span>
					</h2>
					<p className="text-muted-foreground mx-auto max-w-2xl">
						Discover tips, insights, and stories about sustainable living and
						eco-friendly food choices
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{blogPosts.slice(0, 3).map((post, index) => (
						<div
							key={post.id}
							className="animate-fade-in flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-md"
							style={{ animationDelay: `${index * 100}ms` }}>
							<div className="aspect-[16/9] overflow-hidden">
								<img
									src={post.image}
									alt={post.title}
									className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
								/>
							</div>
							<div className="flex flex-grow flex-col p-5">
								<div className="text-muted-foreground mb-3 flex items-center gap-3 text-xs">
									<span className="inline-flex items-center">
										<Calendar className="mr-1 h-3.5 w-3.5" />
										{post.date}
									</span>
									<span className="inline-flex items-center">
										<Clock className="mr-1 h-3.5 w-3.5" />
										{post.readTime} min read
									</span>
								</div>
								<Badge variant="secondary" className="mb-2 w-fit">
									{post.category}
								</Badge>
								<h3 className="hover:text-primary mb-2 line-clamp-2 text-lg font-semibold transition-colors">
									{post.title}
								</h3>
								<p className="text-muted-foreground mb-4 line-clamp-3 flex-grow text-sm">
									{post.excerpt}
								</p>
								<div className="mt-3 flex items-center justify-between">
									<div className="flex items-center">
										<img
											src={post.author.avatar}
											alt={post.author.name}
											className="mr-2 h-8 w-8 rounded-full object-cover"
										/>
										<span className="text-xs">{post.author.name}</span>
									</div>
									<Button
										variant="ghost"
										size="sm"
										className="text-primary hover:text-primary/80 h-auto p-0 hover:bg-transparent">
										Read More
										<ArrowRight className="ml-1 h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 flex justify-center">
					<Button variant="outline" size="lg" className="group">
						View All Articles
						<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Button>
				</div>
			</div>
		</section>
	);
};

export default BlogPosts;
