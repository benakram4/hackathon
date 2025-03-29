"use client";

import Link from "next/link";

import { ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";

const SiteHeader = () => {
	const { totalItems } = useCart();

	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex h-16 w-full items-center border-b backdrop-blur">
			<div className="flex h-[--header-height] w-full items-center justify-between px-4">
				<div className="flex-shrink-0">
					<Link href="/" className="flex items-center gap-2">
						<span className="text-primary text-xl font-semibold">EcoEats</span>
					</Link>
				</div>

				<nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex">
					<Link
						href="/"
						className="hover:text-primary text-sm font-medium transition-colors">
						Home
					</Link>
					<a
						href="#alternatives"
						className="hover:text-primary text-sm font-medium transition-colors">
						Alternatives
					</a>
					<a
						href="#commonly-swapped"
						className="hover:text-primary text-sm font-medium transition-colors">
						Trending
					</a>
					<a
						href="#blog"
						className="hover:text-primary text-sm font-medium transition-colors">
						Blog
					</a>
				</nav>

				<div className="flex items-center gap-4">
					<Link href="/account">
						<Button variant="ghost" size="icon" className="relative">
							<User />
						</Button>
					</Link>
					<Link href="/cart" className="relative">
						<Button variant="ghost" size="icon" className="relative">
							<ShoppingCart className="h-5 w-5" />
							{totalItems > 0 && (
								<span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px]">
									{totalItems}
								</span>
							)}
						</Button>
					</Link>
					<Link href="/products">
						<Button size="sm">Shop Now</Button>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default SiteHeader;
