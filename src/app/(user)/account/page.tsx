import { redirect } from "next/navigation";

import { BadgeIcon, LogOut, Mail, UserCircle } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";

export default async function HomePage() {
	const user = await auth.getUser();
	if (!user) redirect("/");

	const initials = user.name
		? user.name
				.split(" ")
				.map((n) => n[0])
				.join("")
				.toUpperCase()
		: "U";

	console.log("User found", user);

	return (
		<Card className="w-full">
			<CardHeader className="flex flex-col items-center space-y-4 pb-6">
				<Avatar className="h-24 w-24">
					<AvatarImage
						src={`https://avatar.vercel.sh/${user.$id}`}
						alt={user.name || "User"}
					/>
					<AvatarFallback className="text-xl">{initials}</AvatarFallback>
				</Avatar>
				<CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center space-x-3">
					<UserCircle className="text-muted-foreground h-5 w-5" />
					<div>
						<p className="text-sm leading-none font-medium">Name</p>
						<p className="text-muted-foreground text-sm">{user.name}</p>
					</div>
				</div>
				<div className="flex items-center space-x-3">
					<Mail className="text-muted-foreground h-5 w-5" />
					<div>
						<p className="text-sm leading-none font-medium">Email</p>
						<p className="text-muted-foreground text-sm">{user.email}</p>
					</div>
				</div>
				<div className="flex items-center space-x-3">
					<BadgeIcon className="text-muted-foreground h-5 w-5" />
					<div>
						<p className="text-sm leading-none font-medium">User ID</p>
						<p className="text-muted-foreground font-mono text-sm">
							{user.$id}
						</p>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<form action={auth.deleteSession} className="w-full">
					<Button type="submit" variant="outline" className="w-full">
						<LogOut className="mr-2 h-4 w-4" />
						Sign out
					</Button>
				</form>
			</CardFooter>
		</Card>
	);
}
