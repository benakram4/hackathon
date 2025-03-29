import { NextResponse } from "next/server";

import { getFilteredNutriProducts, pollOffApi } from "@/lib/off-logic";
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
			fields: "_id,nutriscore_score,product_name",
			sortBy: "nutriscore_score",
			category,
		});

		if (!allProducts) {
			console.error("No Products Found");
			return NextResponse.json(
				{ error: "Products not found" },
				{ status: 404 },
			);
		}

		console.log(`Specific Product Details: ${JSON.stringify(allProducts)}`);

		// get only products with ecoscore_score available plus with the highest score (for now getting first one)
		const filteredProducts = getFilteredNutriProducts(allProducts);

		if (!filteredProducts || !filteredProducts.length) {
			console.error("Maybe no corresponding products have ecoscore_score");
			return NextResponse.json(
				{ error: "No Filtered products found" },
				{ status: 404 },
			);
		}

		return NextResponse.json(filteredProducts.reverse());
	} catch (error) {
		console.error("Error fetching OFF swapped item:", error);
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
