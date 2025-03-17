"use server";

// https://appwrite.io/docs/tutorials/nextjs-ssr-auth/step-3
import { cookies } from "next/headers";

import { Account, Client } from "node-appwrite";

export async function createSessionClient(sessionValue?: string) {
	const client = new Client()
		.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
		.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

	if (sessionValue) {
		client.setSession(sessionValue);
	} else {
		const newSession = (await cookies()).get("session");
		if (!newSession || !newSession.value) {
			throw new Error("No session");
		}

		client.setSession(newSession.value);
	}

	return {
		get account() {
			return new Account(client);
		},
	};
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function createAdminClient() {
	const client = new Client()
		.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
		.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
		.setKey(process.env.NEXT_APPWRITE_KEY as string);

	return {
		get account() {
			return new Account(client);
		},
	};
}
