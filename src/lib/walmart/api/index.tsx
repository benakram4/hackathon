const baseUrl = process.env.NEXT_PUBLIC_PROD_URL || "http://localhost:3000";

export async function getItems() {
	const response = await fetch(`${baseUrl}/api/walmart/items`, {
		method: "GET",
	});
	if (!response.ok) {
		throw new Error("Failed to fetch items");
	}
	const data = await response.json();
	return data;
}
