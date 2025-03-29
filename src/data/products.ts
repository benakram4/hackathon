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

// Append new products for the showcase examples
export const showcaseProducts = {
	redApple: {
		id: 10,
		name: "Imported Red Apple",
		description: "Fresh imported red apple",
		price: 0.99,
		image:
			"https://images.unsplash.com/photo-1591735179859-a049994205de?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "Fruit",
		tags: ["imported"],
		sustainability: {
			locallySourced: false,
			organicCertified: false,
			carbonFootprint: "high" as "low" | "medium" | "high",
			packaging: "None",
		},
		rating: 4.0,
		isPopular: false,
	},
	greenApple: {
		id: 11,
		name: "Local Green Apple",
		description: "Crisp and delicious local green apple",
		price: 0.89,
		image:
			"https://images.unsplash.com/photo-1678942946279-c83e37f32304?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		category: "Fruit",
		tags: ["local"],
		sustainability: {
			locallySourced: true,
			organicCertified: true,
			carbonFootprint: "low" as "low" | "medium" | "high",
			packaging: "Minimal recyclable packaging",
		},
		rating: 4.5,
		isPopular: false,
	},
	kitKat: {
		id: 12,
		name: "Kit Kat",
		description: "Classic chocolate treat",
		price: 1.29,
		image:
			"https://i5.walmartimages.com/asr/bff7ddec-e78f-4f91-91c9-b7108bbbf7df.e3d00ef710d79915a24cf1ddd977ea5c.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff",
		category: "Snacks",
		tags: ["chocolate", "sugary"],
		sustainability: {
			locallySourced: false,
			organicCertified: false,
			carbonFootprint: "medium" as "low" | "medium" | "high",
			packaging: "Wrapper",
		},
		rating: 4.2,
		isPopular: false,
	},
	lindetDarkChocolate: {
		id: 13,
		name: "Lindet Dark Chocolate",
		description: "Rich and smooth dark chocolate from Lindet",
		price: 1.49,
		image:
			"https://i5.walmartimages.com/asr/c46390e3-1697-4757-9f14-7ef72fe2be81.53ec5ebefe5d690a8702259db49b666f.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff",
		category: "Snacks",
		tags: ["chocolate", "dark"],
		sustainability: {
			locallySourced: true,
			organicCertified: true,
			carbonFootprint: "low" as "low" | "medium" | "high",
			packaging: "Eco-friendly wrapper",
		},
		rating: 4.7,
		isPopular: false,
	},
	angusBeef: {
		id: 14,
		name: "Angus Ground Beef Steak Burgers",
		description: "Juicy Angus ground beef steak burgers",
		price: 7.99,
		image:
			"https://i5.walmartimages.com/asr/53717c08-9650-4568-b79f-f675e58d715d.3d2ec40201a3a607182cd7eccbc9df96.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff",
		category: "Meat",
		tags: ["beef", "conventional"],
		sustainability: {
			locallySourced: false,
			organicCertified: false,
			carbonFootprint: "high" as "low" | "medium" | "high",
			packaging: "Plastic wrap",
		},
		rating: 4.0,
		isPopular: false,
	},
	impossibleBeef: {
		id: 15,
		name: "Impossible Beef Patties Meat from Plants",
		description: "Plant-based alternative to beef patties",
		price: 8.49,
		image:
			"https://i5.walmartimages.com/asr/40e83f1c-9676-4d59-8501-da2399c5bc23.6bc4610a478dfeeeb2d775c5cf2a632a.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff",
		category: "Plant-Based",
		tags: ["vegan", "plant-based", "meat alternative"],
		sustainability: {
			locallySourced: true,
			organicCertified: true,
			carbonFootprint: "low" as "low" | "medium" | "high",
			packaging: "Eco-friendly packaging",
		},
		rating: 4.7,
		isPopular: false,
	},
};

export const productAlternatives: ProductAlternative[] = [
	{
		regularProduct: showcaseProducts.redApple,
		sustainableAlternative: showcaseProducts.greenApple,
		benefits: ["Supports local farming", "Lower transportation emissions"],
		impactSavings: {
			co2Reduction: "1.0kg CO2 per apple",
			waterSaved: "50 liters per apple",
			wasteReduced: "Minimal packaging waste",
		},
	},
	{
		regularProduct: showcaseProducts.kitKat,
		sustainableAlternative: showcaseProducts.lindetDarkChocolate,
		benefits: ["Higher cocoa content", "Better sustainable sourcing"],
		impactSavings: {
			co2Reduction: "0.5kg CO2 per bar",
			waterSaved: "30 liters per bar",
			wasteReduced: "Eco-friendly packaging",
		},
	},
	{
		regularProduct: showcaseProducts.angusBeef,
		sustainableAlternative: showcaseProducts.impossibleBeef,
		benefits: [
			"Lower environmental impact",
			"Sustainable plant-based alternative",
		],
		impactSavings: {
			co2Reduction: "2.0kg CO2 per burger",
			waterSaved: "100 liters per burger",
			wasteReduced: "Reduced animal waste",
		},
	},
];
