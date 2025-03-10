import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ID, Models, OAuthProvider } from "node-appwrite";

import { createAdminClient, createSessionClient } from "../server/appwrite";

export const auth = {
	user: undefined as Models.User<Models.Preferences> | undefined,
	sessionCookie: undefined as RequestCookie | undefined,

	getUser: async (session?: RequestCookie) => {
		auth.sessionCookie = session ? session : (await cookies()).get("session");
		try {
			const { account } = await createSessionClient(auth.sessionCookie?.value);
			auth.user = await account.get();
		} catch {
			auth.user = undefined;
			auth.sessionCookie = undefined;
		}
		return auth.user;
	},

	createSession: async (formData: FormData) => {
		"use server";

		const data = Object.fromEntries(formData);
		const { email, password } = data;
		if (!email || !password) {
			throw new Error("Missing required fields");
		}
		const { account } = await createAdminClient();

		const session = await account.createEmailPasswordSession(
			email as string,
			password as string
		);

		(await cookies()).set("session", session.secret, {
			httpOnly: true,
			sameSite: "strict",
			secure: true,
			expires: new Date(session.expire),
			path: "/",
		});

		redirect("/");
	},

	withGoogle: async () => {
		"use server";

		const { account } = await createAdminClient();
		const origin = (await headers()).get("origin");
		const redirectUrl = await account.createOAuth2Token(
			OAuthProvider.Google,
			`${origin}/api/oauth`,
			`${origin}/login`
		);

		return redirect(redirectUrl);
	},

	signUpWithEmail: async (formData: FormData) => {
		"use server";
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
	},

	deleteSession: async () => {
		"use server";
		auth.sessionCookie = (await cookies()).get("session");
		try {
			const { account } = await createSessionClient(auth.sessionCookie?.value);
			await account.deleteSession("current");
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {}

		(await cookies()).delete("session");
		auth.user = undefined;
		auth.sessionCookie = undefined;
		redirect("/login");
	},
};
