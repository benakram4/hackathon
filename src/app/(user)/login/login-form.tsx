import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";

import { LoginWithGoogle } from "../login-with-google";

// TODO add validation with zod and hook form
export async function LoginForm() {
	const user = await auth.getUser();
	//TODO this redirect should be to handle the middleware
	if (user) redirect("/account");
	return (
		<Card className="flex flex-col gap-6">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your credentials below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={auth.createSession}>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								name="email"
								placeholder="m@example.com"
								required
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<a
									href="#"
									className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
									Forgot your password?
								</a>
							</div>
							<Input
								id="password"
								type="password"
								name="password"
								required
								minLength={8}
							/>
						</div>
						<Button type="submit" className="w-full">
							Login
						</Button>
					</div>
				</form>
				<LoginWithGoogle />
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/signup" className="underline underline-offset-4">
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
