import { type WalmartItem, type WalmartItemsResponse } from "@/types";

// helper function to get particular item from walmart
export const fetchWalmartItem = async (upc: string) => {
	try {
		console.log(`expecting upc: ${upc}`);
		const response = await fetch(`/api/walmart/item/${upc}`);
		if (!response.ok) {
			return null;
		}

		const data = await response.json();

		console.log("Walmart item from API: ", data);

		return data;
	} catch (error) {
		console.error("Error fetching Walmart items:", error);
		return null;
	}
};

export interface WalmartItemsInBulk {
	upc: string;
	available: boolean;
	details?: WalmartItem; // Additional Walmart API response details if needed
}

// check if the items are available in walmart in bulk (expecting array of upcs to confirm their availability respectively, info is required, in stock is walmart's problem)
export async function fetchWalmartItemsInBulk(
	items: { _id: string; environmental_score_score: string }[],
	options?: {
		maxRetries?: number; // Default 3
		delayBetweenRequests?: number; // Default 500ms
	},
): Promise<WalmartItemsInBulk[]> {
	// this options are for retrying the request to walmart api with exponential backoff
	const { maxRetries = 3, delayBetweenRequests = 500 } = options || {};

	if (!items?.length) return [];

	const results: WalmartItemsInBulk[] = [];

	let availableCount = 0;
	let shouldStop = false;
	const abortController = new AbortController();

	// Process UPCs in batches (Walmart might have rate limits)
	// concurrently look up for 5 items in batches
	try {
		for (let i = 0; i < items.length && !shouldStop; i += 20) {
			const batch = items.slice(i, i + 20);

			const batchResults = await Promise.all(
				batch.map(async (item) => {
					if (shouldStop) return null; // Skip if we're done

					// this is based on expected data structure
					const upc = item._id;
					let retries = 0;
					let success = false;
					let available = false; // this flag doesn't imply that product is in stock but instead we got data from walmart api
					let details: WalmartItemsResponse | null = null;

					while (retries < maxRetries && !success) {
						try {
							const response = await fetch(`/api/walmart/item/${upc}`, {
								signal: abortController.signal,
							});

							if (abortController.signal.aborted) return null;

							// for some reason walmart prefers to give bad request 400 for product not found lol
							if (response.status === 400) {
								// Item not found
								available = false;
								success = true;
							} else if (response.ok) {
								// Item found
								details = await response.json().then((data) => data.items[0]);
								available = true;
								success = true;
								// Atomically increment and check
								const currentCount = ++availableCount;
								if (currentCount >= 3) {
									shouldStop = true;
									abortController.abort();
								}
							} else if (response.status === 429) {
								// Rate limited - wait and retry
								await new Promise((resolve) =>
									setTimeout(resolve, 1000 * (retries + 1)),
								);
							} else {
								// Other error - retry
								throw new Error(`API returned ${response.status}`);
							}
						} catch (error) {
							if (error instanceof Error && error.name === "AbortError") {
								console.log("Aborted request: we got what we need ;)");
								return null;
							}
							// Handle other errors (e.g., network issues from walmart api)
							console.error(`Error checking UPC ${upc}:`, error);
							retries++;
							if (retries >= maxRetries) {
								console.error(`Max retries reached for UPC ${upc}`);
							} else {
								await new Promise((resolve) =>
									setTimeout(resolve, delayBetweenRequests),
								);
							}
						}
					}

					return success
						? { upc, available, details }
						: { upc, available: false };

					// results.push({
					// 	upc: upc,
					// 	available: success ? available : false, // Mark as unavailable if all retries failed
					// 	details: success ? details : undefined
					// });
				}),
			);

			// Filter out nulls (from skipped items) and add to results
			results.push(
				...(batchResults.filter((item) => {
					return item?.available && item.details !== null;
				}) as WalmartItemsInBulk[]),
			);

			// Be polite to Walmart's API :)
			if (delayBetweenRequests > 0) {
				await new Promise((resolve) =>
					setTimeout(resolve, delayBetweenRequests),
				);
			}
		}
	} catch (error) {
		if (error instanceof Error && error.name !== "AbortError") {
			console.error("Bulk fetch error:", error);
			// Consider partial results in error case
			return results;
		}
	}

	console.log("Walmart items in bulk: ", results);

	return results;
}
