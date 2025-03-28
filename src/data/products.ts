// TODO delete after the landing page uses real data

export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
	category: string;
	tags: string[];
	sustainability: {
		locallySourced: boolean;
		organicCertified: boolean;
		carbonFootprint: "low" | "medium" | "high";
		packaging: string;
	};
	rating: number;
	isPopular: boolean;
}

export interface ProductAlternative {
	regularProduct: Product;
	sustainableAlternative: Product;
	benefits: string[];
	impactSavings: {
		co2Reduction: string;
		waterSaved: string;
		wasteReduced: string;
	};
}

export const products: Product[] = [
	{
		id: 1,
		name: "Organic Avocados",
		description:
			"Fresh, locally grown organic avocados packed with nutrients and flavor",
		price: 4.99,
		image:
			"https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=1200&auto=format&fit=crop",
		category: "Produce",
		tags: ["organic", "local", "fruit"],
		sustainability: {
			locallySourced: true,
			organicCertified: true,
			carbonFootprint: "low",
			packaging: "Minimal recyclable packaging",
		},
		rating: 4.8,
		isPopular: true,
	},
	{
		id: 2,
		name: "Free-Range Eggs",
		description:
			"Ethically produced free-range eggs from happy hens with access to the outdoors",
		price: 5.49,
		image:
			"https://images.unsplash.com/photo-1598965375147-990c2b167545?q=80&w=1200&auto=format&fit=crop",
		category: "Dairy & Eggs",
		tags: ["free-range", "ethical", "protein"],
		sustainability: {
			locallySourced: true,
			organicCertified: false,
			carbonFootprint: "low",
			packaging: "Compostable carton",
		},
		rating: 4.6,
		isPopular: true,
	},
	{
		id: 3,
		name: "Plant-Based Burger Mix",
		description:
			"Delicious plant-based burger mix made from pea protein and natural ingredients",
		price: 6.99,
		image:
			"https://images.unsplash.com/photo-1551526793-76ab679a9a97?q=80&w=1200&auto=format&fit=crop",
		category: "Plant-Based",
		tags: ["vegan", "sustainable", "protein"],
		sustainability: {
			locallySourced: false,
			organicCertified: true,
			carbonFootprint: "low",
			packaging: "100% recycled paperboard",
		},
		rating: 4.5,
		isPopular: true,
	},
	{
		id: 4,
		name: "Sourdough Bread",
		description:
			"Artisanal sourdough bread made with organic flour and traditional fermentation",
		price: 5.99,
		image:
			"https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?q=80&w=1200&auto=format&fit=crop",
		category: "Bakery",
		tags: ["artisanal", "organic", "fermented"],
		sustainability: {
			locallySourced: true,
			organicCertified: true,
			carbonFootprint: "low",
			packaging: "Paper bag",
		},
		rating: 4.9,
		isPopular: true,
	},
	{
		id: 5,
		name: "Wild Caught Salmon",
		description:
			"Responsibly sourced wild-caught salmon rich in omega-3 fatty acids",
		price: 12.99,
		image:
			"https://images.unsplash.com/photo-1559717865-a99cac1c95d8?q=80&w=1200&auto=format&fit=crop",
		category: "Seafood",
		tags: ["wild-caught", "sustainable fishing", "protein"],
		sustainability: {
			locallySourced: false,
			organicCertified: false,
			carbonFootprint: "medium",
			packaging: "Minimal plastic",
		},
		rating: 4.7,
		isPopular: false,
	},
	{
		id: 6,
		name: "Quinoa Bowl",
		description:
			"Ready-to-eat quinoa bowl with roasted vegetables and tahini dressing",
		price: 8.99,
		image:
			"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
		category: "Ready Meals",
		tags: ["plant-based", "gluten-free", "convenient"],
		sustainability: {
			locallySourced: true,
			organicCertified: true,
			carbonFootprint: "low",
			packaging: "Compostable container",
		},
		rating: 4.5,
		isPopular: true,
	},
	{
		id: 7,
		name: "Conventional Beef Patties",
		description: "Regular beef burger patties for grilling",
		price: 7.99,
		image:
			"https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?q=80&w=1200&auto=format&fit=crop",
		category: "Meat",
		tags: ["beef", "conventional", "protein"],
		sustainability: {
			locallySourced: false,
			organicCertified: false,
			carbonFootprint: "high",
			packaging: "Plastic tray with film",
		},
		rating: 3.9,
		isPopular: false,
	},
	{
		id: 8,
		name: "Imported Bananas",
		description: "Conventionally grown imported bananas",
		price: 1.99,
		image:
			"https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=1200&auto=format&fit=crop",
		category: "Produce",
		tags: ["fruit", "conventional", "imported"],
		sustainability: {
			locallySourced: false,
			organicCertified: false,
			carbonFootprint: "high",
			packaging: "Plastic bag",
		},
		rating: 3.5,
		isPopular: false,
	},
	{
		id: 9,
		name: "Bottled Water (24-pack)",
		description: "Single-use plastic water bottles",
		price: 6.99,
		image:
			"https://images.unsplash.com/photo-1564419320461-6870880221ad?q=80&w=1200&auto=format&fit=crop",
		category: "Beverages",
		tags: ["water", "conventional", "plastic"],
		sustainability: {
			locallySourced: false,
			organicCertified: false,
			carbonFootprint: "high",
			packaging: "Single-use plastic",
		},
		rating: 2.8,
		isPopular: false,
	},
];

export const productAlternatives: ProductAlternative[] = [
	{
		regularProduct: products.find((p) => p.id === 7)!,
		sustainableAlternative: products.find((p) => p.id === 3)!,
		benefits: [
			"85% less greenhouse gas emissions",
			"99% less water usage",
			"No antibiotics or hormones",
			"Lower cholesterol and saturated fat",
		],
		impactSavings: {
			co2Reduction: "7.2kg CO2 per kg",
			waterSaved: "1,500 liters per kg",
			wasteReduced: "Eliminates animal waste runoff",
		},
	},
	{
		regularProduct: products.find((p) => p.id === 8)!,
		sustainableAlternative: products.find((p) => p.id === 1)!,
		benefits: [
			"Supports local economy",
			"Reduces transportation emissions",
			"No synthetic pesticides",
			"Higher nutrient content",
		],
		impactSavings: {
			co2Reduction: "2.3kg CO2 per kg",
			waterSaved: "650 liters per kg",
			wasteReduced: "Zero pesticide runoff",
		},
	},
	{
		regularProduct: products.find((p) => p.id === 9)!,
		sustainableAlternative: {
			id: 10,
			name: "Stainless Steel Water Bottle",
			description: "Reusable stainless steel water bottle for everyday use",
			price: 24.99,
			image:
				"https://images.unsplash.com/photo-1585237017125-24baf8d7406f?q=80&w=1200&auto=format&fit=crop",
			category: "Home Goods",
			tags: ["reusable", "sustainable", "plastic-free"],
			sustainability: {
				locallySourced: false,
				organicCertified: false,
				carbonFootprint: "low",
				packaging: "Minimal recycled cardboard",
			},
			rating: 4.9,
			isPopular: true,
		},
		benefits: [
			"Eliminates single-use plastic waste",
			"Pays for itself in 2 months",
			"Keeps drinks cold for 24 hours",
			"BPA and toxin free",
		],
		impactSavings: {
			co2Reduction: "83kg CO2 per year",
			waterSaved: "1,460 liters per year",
			wasteReduced: "167 plastic bottles per year",
		},
	},
];

export const trendingProducts = products.filter((product) => product.isPopular);
