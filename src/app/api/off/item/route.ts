import { NextResponse } from "next/server";

import OpenFoodFacts from "@/lib/off/src/main";

export const off = new OpenFoodFacts(fetch, { country: "ca" });

export async function GET(req: Request) {
	try {
		const query = new URL(req.url).searchParams;
		if (!query) {
			return NextResponse.json({ error: "Query is required" }, { status: 400 });
		}

		const barcode = query.get("barcode");
		console.log(`Barcode Param: ${barcode}`);
		if (!barcode || barcode === undefined) {
			return NextResponse.json(
				{ error: "Barcode is required or invalid" },
				{ status: 400 },
			);
		}

		const product = await off.getProduct(barcode);

		if (!product) {
			return NextResponse.json({ error: "Product not found" }, { status: 404 });
		}

		return NextResponse.json(product);
	} catch (error) {
		console.error("Error fetching OFF item:", error);
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
