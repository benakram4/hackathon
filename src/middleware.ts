// https://nextjs.org/docs/app/building-your-application/routing/middleware
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getUser } from "@/lib/auth";

const protectedRoutes = ["/products", "/account"];
const publicRoutes = ["/login", "/signup", "/"];

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const isPublicRoute = publicRoutes.includes(path);
	if (isPublicRoute) {
		return NextResponse.next();
	}
	const isProtectedRoute = protectedRoutes.includes(path);
	const user = await getUser();

	if (isProtectedRoute && !user) {
		// console.log("Not User found", user);
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (isProtectedRoute && user) {
		return NextResponse.next();
	}

	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
