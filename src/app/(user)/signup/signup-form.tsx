import Link from "next/link";

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
import { signUpWithEmail } from "@/lib/auth";

import { LoginWithGoogle } from "../login-with-google";

// TODO add validation with zod and hook form
export function SignupForm() {
	return (
		<Card className="flex flex-col gap-6">
			<CardHeader>
				<CardTitle className="text-2xl">Sign Up</CardTitle>
				<CardDescription>
					Enter your email below to sign up to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					action={async (formData: FormData) => {
						"use server";
						try {
							await signUpWithEmail(formData);
						} catch (error: unknown) {
							console.error("Signup failed:", error);
							if (error instanceof Error) {
								throw error;
							}
							throw new Error("An unknown error occurred during signup");
						}
					}}>
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
							Sign Up
						</Button>
					</div>
				</form>
				<LoginWithGoogle />
				<div className="mt-4 text-center text-sm">
					Already have an account?{" "}
					<Link href="/login" className="underline underline-offset-4">
						Sign in
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
