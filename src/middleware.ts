// https://nextjs.org/docs/app/building-your-application/routing/middleware
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "./lib/auth";

export async function middleware(request: NextRequest) {
	const user = await auth.getUser();

	if (!user) {
		console.log("Not User found", user);
		return NextResponse.redirect(new URL("/login", request.url));
	}
	console.log("middleware ran");
	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/", "/account"],
};

/* will be used in the future to protect routes
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
 */
// '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
