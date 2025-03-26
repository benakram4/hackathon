// helper function to get particular item from walmart
export const fetchWalmartItem = async (upc: string) => {
	try {
		const response = await fetch(`/api/walmart/item?upc=${upc}`);
		const data = await response.json();

		if (!data) {
			return null;
		}

		return data;
	} catch (error) {
		console.error("Error fetching Walmart items:", error);
		return null;
	}
};
