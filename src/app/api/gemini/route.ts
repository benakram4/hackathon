import { NextResponse } from "next/server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { promises as fs } from "fs";

export async function POST(request: Request) {
	try {
		const context =
			"Is the following product made by a Canadian company? If not, list some alternatives from the attached file or the web, with just their names.";
		const { prompt } = await request.json();
		const fullPrompt = `${context} ${prompt}`;

		const result = await generateText({
			model: google("gemini-2.0-flash-001"),
			messages: [
				{
					role: "user",
					content: [
						{
							type: "text",
							text: fullPrompt,
						},
						{
							type: "file",
							data: await fs.readFile("./src/data/canadian-products.txt"),
							mimeType: "text/plain",
						},
					],
				},
			],
		});

		console.log(result.text);
		return NextResponse.json({ joke: result.text });
	} catch (error: unknown) {
		console.error("Error generating joke:", error);
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		} else {
			return NextResponse.json({ error: "Unknown error" }, { status: 500 });
		}
	}
}
