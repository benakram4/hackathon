import { NextResponse } from "next/server";

import OpenFoodFacts from "@/lib/off/src/main";

export const off = new OpenFoodFacts(fetch, { country: "ca" });

export async function GET() {
	// const query = new URL(req.url).searchParams;
	// const barcode = query.get('barcode');

	// if (!barcode) {
	//     return NextResponse.json({ error: 'Barcode is required' }, { status: 400 });
	// }

	// const product = await off.getProduct(barcode);

	// if (!product) {
	//     return NextResponse.json({ error: 'Product not found' }, { status: 404 });
	// }

	// const product = await off.search('categories_tag: en:cocoa-and-hazelnuts-spreads');

	const products = await fetch(
		"https://world.openfoodfacts.org/api/v2/search?categories_tags_en=cocoa-and-hazelnuts-spreads",
		{
			method: "GET",
		}
	);

	console.log(`Fetched item: ${JSON.stringify(products)}`);

	return NextResponse.json(products);
}
