import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export default async function HomePage() {
	const user = await auth.getUser();
	if (!user) redirect("/");

	return (
		<>
			<ul>
				<li>
					<strong>Email:</strong> {user.email}
				</li>
				<li>
					<strong>Name:</strong> {user.name}
				</li>
				<li>
					<strong>ID: </strong> {user.$id}
				</li>
			</ul>

			<form action={auth.deleteSession}>
				<button type="submit">Sign out</button>
			</form>
		</>
	);
}
