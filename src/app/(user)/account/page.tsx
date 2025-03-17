// This is now a server component (no "use client" directive)
import { redirect } from "next/navigation";

import { getUser } from "@/lib/auth";

import Account from "./account";

export default async function AccountPage() {
	// Fetch user data server-side
	const user = await getUser();

	// If no user is found, redirect to login
	if (!user) {
		redirect("/login");
	}

	return (
		// Pass user data to the client component
		<Account user={user} />
	);
}
