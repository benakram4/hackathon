export type UserImpact = {
	$id: string;
	userId: string;
	co2: number;
	waste: number;
	water: number;
};

export type OrderSwapHistory = {
	$id: string;
	$createdAt: string;
	orderId: string;
	originalProduct: string;
	swappedProduct: string;
	co2: number;
	waste: number;
	water: number;
};

export type UserOrders = {
	$id: string;
	$createdAt: string;
	userId: string;
	items: number;
	swaps: OrderSwapHistory[];
	total: number;
	status: string;
	co2: number;
	waste: number;
	water: number;
};
