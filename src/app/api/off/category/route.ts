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

	// cocoa-and-hazelnuts-spreads

	const product = await off.search("", "product_name", {
		categories_tags: "en:cocoa-and-hazelnuts-spreads",
	});

	console.log(`Fetched item: ${JSON.stringify(product?.products?.length)}`);

	return NextResponse.json(product);
}
