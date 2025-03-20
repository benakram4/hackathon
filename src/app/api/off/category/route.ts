import { NextResponse } from "next/server";

import { getFilteredEcoProducts } from "@/lib/off-logic";
import OpenFoodFacts from "@/lib/off/src/main";

export const off = new OpenFoodFacts(fetch, { country: "ca" });

export async function GET(req: Request) {
	const query = new URL(req.url).searchParams;
	// const category = query.get("category")?.trim()
	const category = query.get("category")?.trim().split(":")[1];

	if (!category) {
		return NextResponse.json(
			{ error: "Category param is required" },
			{ status: 400 },
		);
	}

	console.log(`Category Param: ${category}`);

	let page = 1;
	const limiter = 10; // this needs to be set in case there are lot of products
	const allProducts = [];

	// polling OFF api to get all products since there is api max limit of 100 products at a time
	while (true) {
		// we get only id and ecoscore_score since thats all we need for now
		const response = await off.search("_id,ecoscore_score", "nothing", {
			page,
			page_size: 100,
			categories_tags: category,
		});

		const data = response;

		if (data?.products?.length === 0 || !data?.products) {
			console.log(`No more products found on page ${page} .`);
			break;
		}

		allProducts.push(...data.products);
		page++;

		if (page > limiter) {
			console.log("Reached limiter");
			break;
		}
	}

	console.log(`Fetched ${allProducts.length} products.`);

	if (!allProducts) {
		return NextResponse.json({ error: "Products not found" }, { status: 404 });
	}

	const filteredProducts = getFilteredEcoProducts(allProducts);

	if (!filteredProducts) {
		return NextResponse.json(
			{ error: "No Filtered products found" },
			{ status: 404 },
		);
	}

	// @ts-expect-error _id is not defined in type
	console.log(`here is code: ${filteredProducts[0]?._id}.`);

	// @ts-expect-error _id is not defined in type
	const specificProductDetails = await off.getProduct(filteredProducts[0]?._id);

	return NextResponse.json(specificProductDetails);
}
