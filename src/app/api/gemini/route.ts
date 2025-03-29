import { NextResponse } from "next/server";

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

export async function POST(request: Request) {
	try {
		const { prompt } = await request.json();

		const filePath = path.join(
			process.cwd(),
			"src",
			"data",
			"canadian-products.txt",
		);

		const { object } = await generateObject({
			model: google("gemini-2.0-flash-001"),
			messages: [
				{
					role: "system",
					content:
						"Attatched is a document with categories of products the document is a user-sourced guide to products made in Canada, categorized into two sections:\n" +
						"\n" +
						"-   Products made in Canada by Canadian companies\n" +
						"-   Products made in Canada by Foreign-owned companies\n" +
						"\n" +
						"When we send you a product name, find out if it is canadian and return a list of 3 suitable Alternative Product Names FROM the document if it is not canadian. Do not send alternative products if it is already a Canadian product.",
				},
				{
					role: "user",
					content: [
						{
							type: "text",
							text: prompt,
						},
						{
							type: "file",
							data: await fs.readFile(filePath),
							mimeType: "text/plain",
						},
					],
				},
			],
			schema: z.object({
				"Original Product Name": z.string(),
				"Product Category": z.string(),
				isCanadian: z.boolean(),
				"Alternative Product Name": z.array(z.string()).optional(),
			}),
		});

		console.log(JSON.stringify(object));
		return NextResponse.json(object);
	} catch (error: unknown) {
		console.error("Error generating joke:", error);
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		} else {
			return NextResponse.json({ error: "Unknown error" }, { status: 500 });
		}
	}
}
