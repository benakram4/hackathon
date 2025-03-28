import { NextResponse } from "next/server";

import { getFilteredAndSortedEcoProducts, pollOffApi } from "@/lib/off-logic";
import { getOffClient } from "@/providers/get-off-client";

// naming convention might be confusing since we
export async function GET(req: Request) {
	const off = getOffClient();
	try {
		const query = new URL(req.url).searchParams;
		// const category = query.get("category")?.trim()
		const category = query.get("category")?.trim().split(":")[1];

		if (!category) {
			console.error("Category Param not provided or invalid");
			return NextResponse.json(
				{ error: "Category param is required" },
				{ status: 400 },
			);
		}

		const allProducts = await pollOffApi({
			offClient: off,
			fields: "_id,ecoscore_score",
			sortBy: "ecoscore_score",
			category,
		});

		if (!allProducts) {
			console.error("No Products Found");
			return NextResponse.json(
				{ error: "Products not found" },
				{ status: 404 },
			);
		}

		// get only products with ecoscore_score available plus with the highest score (for now getting first one)
		// expect sortiing to be done in desc order
		const filteredProducts = getFilteredAndSortedEcoProducts(allProducts);

		if (!filteredProducts || !filteredProducts.length) {
			console.error("Maybe no corresponding products have ecoscore_score");
			return NextResponse.json(
				{ error: "No Filtered products found" },
				{ status: 404 },
			);
		}
		console.log(
			`Got total of: ${filteredProducts.length} products with ecoscore_score as alternative`,
		);

		// consider sending all the the products with ecoscore_score since we are checking later which ones exist in walmart, so might need to go through lot of them
		return NextResponse.json(filteredProducts);
	} catch (error) {
		console.error("Error fetching OFF swapped item:", error);
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
