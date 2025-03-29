import { NextResponse } from "next/server";

import { getOffClient } from "@/providers/get-off-client";

export async function GET(req: Request) {
	const off = getOffClient();
	try {
		const product = await off.getCategories();

		if (!product) {
			return NextResponse.json({ error: "Product not found" }, { status: 404 });
		}

		return NextResponse.json(product);
	} catch (error) {
		console.error("Error fetching OFF item:", error);
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
