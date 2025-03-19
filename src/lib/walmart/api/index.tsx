const baseUrl = process.env.NEXT_PUBLIC_PROD_URL || "http://localhost:3000";

export async function getItems() {
	const response = await fetch(`${baseUrl}/api/walmart/items`, {
		method: "GET",
	});
	if (!response.ok) {
		throw new Error("Failed to fetch items");
	}
	return await response.json();
}

export async function getItem(itemId: string) {
	const response = await fetch(`${baseUrl}/api/walmart/item/${itemId}`, {
		method: "GET",
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch item with ID: ${itemId}`);
	}

	return await response.json();
}
