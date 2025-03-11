export type WalmartCategory = {
	id: string;
	name: string;
	path: string;
	children?: WalmartCategory[];
};

export type WalmartCategoriesResponse = {
	categories: WalmartCategory[];
};
