"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { ID, OAuthProvider } from "node-appwrite";

import { createAdminClient, createSessionClient } from "../server/appwrite";

export async function createSession(formData: FormData) {
	const data = Object.fromEntries(formData);
	const { email, password } = data;
	if (!email || !password) {
		throw new Error("Missing required fields");
	}
	const { account } = await createAdminClient();

	const session = await account.createEmailPasswordSession(
		email as string,
		password as string,
	);

	(await cookies()).set("session", session.secret, {
		httpOnly: true,
		sameSite: "strict",
		secure: true,
		expires: new Date(session.expire),
		path: "/",
	});

	redirect("/");
}

export async function withGoogle() {
	const { account } = await createAdminClient();
	const origin = (await headers()).get("origin");
	const redirectUrl = await account.createOAuth2Token(
		OAuthProvider.Google,
		`${origin}/api/oauth`,
		`${origin}/login`,
	);

	return redirect(redirectUrl);
}

export async function signUpWithEmail(formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!email || !password) {
		throw new Error("Missing required fields");
	}

	const { account } = await createAdminClient();

	await account.create(ID.unique(), email, password);
	const session = await account.createEmailPasswordSession(email, password);

	(await cookies()).set("session", session.secret, {
		path: "/",
		httpOnly: true,
		sameSite: "strict",
		secure: true,
	});

	redirect("/account");
}

export async function deleteSession() {
	const sessionCookie = (await cookies()).get("session");
	try {
		const { account } = await createSessionClient(sessionCookie?.value);
		await account.deleteSession("current");
	} catch (error) {
		console.error(error);
	}

	(await cookies()).delete("session");
	redirect("/login");
}

// Add this new function to use in server components
export async function getUser() {
	const sessionCookie = (await cookies()).get("session");
	try {
		const { account } = await createSessionClient(sessionCookie?.value);
		return await account.get();
	} catch {
		return undefined;
	}
}
