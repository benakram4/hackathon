export interface BlogPost {
	id: number;
	title: string;
	excerpt: string;
	content: string;
	image: string;
	author: {
		name: string;
		avatar: string;
	};
	date: string;
	readTime: number;
	category: string;
	tags: string[];
}

export const blogPosts: BlogPost[] = [
	{
		id: 1,
		title: "10 Simple Swaps for a More Sustainable Kitchen",
		excerpt:
			"Discover easy product swaps that can make your kitchen more eco-friendly without sacrificing convenience.",
		content: "",
		image:
			"https://images.unsplash.com/photo-1556911261-6bd341186b2f?q=80&w=1200&auto=format&fit=crop",
		author: {
			name: "Emma Clarke",
			avatar:
				"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
		},
		date: "May 15, 2023",
		readTime: 6,
		category: "Sustainable Living",
		tags: ["kitchen", "eco-friendly", "product swaps"],
	},
	{
		id: 2,
		title: "The Environmental Impact of Your Food Choices",
		excerpt:
			"How your diet affects the planet and what small changes can make a big difference.",
		content: "",
		image:
			"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
		author: {
			name: "Dr. Michael Rodriguez",
			avatar:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&auto=format&fit=crop",
		},
		date: "April 22, 2023",
		readTime: 8,
		category: "Food & Environment",
		tags: ["carbon footprint", "sustainable diet", "climate change"],
	},
	{
		id: 3,
		title: "Why Local Food Systems Matter More Than Ever",
		excerpt:
			"The importance of supporting local farmers and building resilient community food systems.",
		content: "",
		image:
			"https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1200&auto=format&fit=crop",
		author: {
			name: "Sarah Johnson",
			avatar:
				"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
		},
		date: "June 3, 2023",
		readTime: 7,
		category: "Local Food",
		tags: ["farmers markets", "community supported agriculture", "food miles"],
	},
	{
		id: 4,
		title: "Understanding Food Labels: What They Really Mean",
		excerpt:
			"A guide to decoding organic, non-GMO, fair trade, and other common food certifications.",
		content: "",
		image:
			"https://images.unsplash.com/photo-1576402187878-974f70c890a5?q=80&w=1200&auto=format&fit=crop",
		author: {
			name: "Daniel Chen",
			avatar:
				"https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=120&auto=format&fit=crop",
		},
		date: "May 28, 2023",
		readTime: 9,
		category: "Food Education",
		tags: ["food labels", "organic", "fair trade", "certifications"],
	},
];
