export type WalmartCategory = {
	id: string;
	name: string;
	path: string;
	children?: WalmartCategory[];
};

export type WalmartCategoriesResponse = {
	categories: WalmartCategory[];
};

export type SearchResponse = {
	query: string;
	sort: string;
	responseGroup: string;
	totalResults: number;
	start: number;
	numItems: number;
	items: WalmartItem[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	facets: any[]; // TODO Replace 'any' with a more specific type if possible
};

export type WalmartItem = {
	itemId: number;
	parentItemId: number;
	name: string;
	msrp: number;
	salePrice: number;
	upc: string;
	categoryPath: string;
	shortDescription: string;
	longDescription: string;
	brandName: string;
	thumbnailImage: string;
	mediumImage: string;
	largeImage: string;
	productTrackingUrl: string;
	standardShipRate: number;
	size: string;
	color: string;
	marketplace: boolean;
	modelNumber: string;
	sellerInfo: string;
	categoryNode: string;
	rhid: string;
	bundle: boolean;
	clearance: boolean;
	preOrder: boolean;
	stock: string;
	attributes: {
		size: string;
		uniqueProductId: string;
	};
	affiliateAddToCartUrl: string;
	freeShippingOver35Dollars: boolean;
	availableOnline: boolean;
	offerId: string;
};

export type WalmartItemsResponse = {
	category: string;
	format: string;
	nextPage: string;
	totalPages: string;
	items: WalmartItem[];
};
