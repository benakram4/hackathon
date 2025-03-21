export const RELEVANT_CATEGORIES: Record<string, string> = {
	"976759": "Food",
} as const;

export const RELEVANT_FOOD_SUBCATEGORIES = {
	"976759_976786": "Condiments, Sauces & Spices",
	"976759_976783": "Breakfast & Cereal",
	"976759_976794": "Pantry", // need to be filtered more as it has books and other items // ignore first 20
	"976759_1086446": "Coffee",
	"976759_7404240": "International Food",
	"976759_1228024": "Organic Food",
	"976759_3701649": "Grab & Go",
	"976759_9569500": "Meat & Seafood", // most data is useful but some are not for some reason it shows pet beds and shoes // ignore first 12
	"976759_976779": "Bakery & Bread",
	"976759_976789": "Deli", // most data is useful but some are not for some reason it shows pet beds and shoes // ignore first 5
	"976759_976782": "Beverages", // has mixed data like music albums and other items need more filtering // ignore first 8
	"976759_976780": "Baking", // Ignore top 7
	"976759_5004481": "Dietary & Lifestyle Shop",
	"976759_9176907": "Dairy & Eggs",
};
