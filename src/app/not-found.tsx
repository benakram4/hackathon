import { headers } from "next/headers";
import Link from "next/link";

export default async function NotFound() {
	const headersList = await headers();
	const domain = headersList.get("host");
	return (
		<div className="container mx-auto mt-[25%] p-4">
			<h2>Not Found: {domain}</h2>
			<p>Could not find requested resource</p>
			<p>
				View{" "}
				<Link className="text-primary underline" href="/">
					Home
				</Link>
			</p>
		</div>
	);
}
