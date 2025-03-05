"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Leaf, Menu, Search, ShoppingCart, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function MainNav() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [cartCount, setCartCount] = useState(0);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	// Handle scroll effect for fixed navigation
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Simulate cart count for demo purposes
	useEffect(() => {
		setCartCount(3);
	}, []);

	return (
		<header
			className={cn(
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
				isScrolled
					? "bg-white/95 backdrop-blur-sm shadow-sm dark:bg-gray-950/95"
					: "bg-white dark:bg-gray-950"
			)}
		>
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<Leaf className="h-6 w-6 text-primary" />
						<span className="text-xl font-semibold">EcoEats</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuTrigger className="text-base">
										Shop
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
											{shopCategories.map((category) => (
												<li key={category.title}>
													<NavigationMenuLink asChild>
														<Link
															href={category.href}
															className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
														>
															<div className="text-sm font-medium leading-none">
																{category.title}
															</div>
															<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
																{category.description}
															</p>
														</Link>
													</NavigationMenuLink>
												</li>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuTrigger className="text-base">
										Sustainability
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
											{sustainabilityItems.map((item) => (
												<li key={item.title}>
													<NavigationMenuLink asChild>
														<Link
															href={item.href}
															className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
														>
															<div className="text-sm font-medium leading-none">
																{item.title}
															</div>
															<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
																{item.description}
															</p>
														</Link>
													</NavigationMenuLink>
												</li>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					{/* Search, Account, Cart */}
					<div className="flex items-center space-x-4">
						<div className="hidden md:block relative w-full max-w-xs">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search sustainable products..."
								className="w-full rounded-full bg-muted pl-8 md:w-[200px] lg:w-[250px] focus-visible:ring-green-500"
							/>
						</div>

						<Button
							variant="ghost"
							size="icon"
							aria-label="Search"
							className="md:hidden"
							onClick={() => setIsSearchOpen(true)}
						>
							<Search className="h-5 w-5" />
						</Button>

						<Button variant="ghost" size="icon" aria-label="Account">
							<User className="h-5 w-5" />
						</Button>

						<Button
							variant="ghost"
							size="icon"
							aria-label="Shopping cart"
							className="relative"
						>
							<ShoppingCart className="h-5 w-5" />
							{cartCount > 0 && (
								<Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary p-0 text-xs flex items-center justify-center">
									{cartCount}
								</Badge>
							)}
						</Button>

						{/* Mobile Menu */}
						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="md:hidden"
									aria-label="Menu"
								>
									<Menu className="h-5 w-5" />
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-[300px] sm:w-[350px]">
								<SheetTitle className="sr-only">Navigation Menu</SheetTitle>
								<div className="flex flex-col h-full">
									<div className="px-4 py-6">
										<div className="mb-4 flex items-center justify-between">
											<Link href="/" className="flex items-center space-x-2">
												<Leaf className="h-6 w-6 text-primary" />
												<span className="text-xl font-semibold">EcoEats</span>
											</Link>
										</div>
										<div className="relative mb-6">
											<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
											<Input
												type="search"
												placeholder="Search sustainable products..."
												className="w-full rounded-full bg-muted pl-8"
											/>
										</div>
										<nav className="flex flex-col space-y-6">
											<div>
												<h3 className="mb-3 text-lg font-semibold">Shop</h3>
												<ul className="space-y-3">
													{shopCategories.map((category) => (
														<li key={category.title}>
															<Link
																href={category.href}
																className="text-muted-foreground hover:text-foreground"
															>
																{category.title}
															</Link>
														</li>
													))}
												</ul>
											</div>
											<div>
												<h3 className="mb-3 text-lg font-semibold">
													Sustainability
												</h3>
												<ul className="space-y-3">
													{sustainabilityItems.map((item) => (
														<li key={item.title}>
															<Link
																href={item.href}
																className="text-muted-foreground hover:text-foreground"
															>
																{item.title}
															</Link>
														</li>
													))}
												</ul>
											</div>
										</nav>
									</div>
									<div className="mt-auto border-t p-4">
										<div className="flex flex-col space-y-3">
											<Button variant="outline">
												<User className="mr-2 h-4 w-4" />
												My Account
											</Button>
											<Button>
												<ShoppingCart className="mr-2 h-4 w-4" />
												View Cart ({cartCount})
											</Button>
										</div>
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
			{/* Mobile Search Dialog */}
			<Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
				<DialogContent className="sm:max-w-[100%] w-[90%] p-0 bg-transparent border-none shadow-none">
					<div className="relative w-full px-4 py-4">
						<Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search sustainable products..."
							className="w-[calc(100%-2rem)] mx-4 pl-10 pr-4 py-8 text-lg bg-transparent border-none rounded-md ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
							autoFocus
						/>
					</div>
				</DialogContent>
			</Dialog>
		</header>
	);
}

const shopCategories = [
	{
		title: "Produce",
		description:
			"Fresh, organic fruits and vegetables sourced from local farms.",
		href: "/shop/produce",
	},
	{
		title: "Dairy & Eggs",
		description: "Ethically produced dairy products and free-range eggs.",
		href: "/shop/dairy-eggs",
	},
	{
		title: "Meat & Seafood",
		description: "Sustainably raised meat and responsibly sourced seafood.",
		href: "/shop/meat-seafood",
	},
	{
		title: "Pantry",
		description:
			"Organic staples and specialty items for your sustainable kitchen.",
		href: "/shop/pantry",
	},
	{
		title: "Beverages",
		description:
			"Organic, fair-trade coffee, tea, and other refreshing drinks.",
		href: "/shop/beverages",
	},
	{
		title: "Frozen Foods",
		description: "Convenient, organic frozen meals and ingredients.",
		href: "/shop/frozen",
	},
	{
		title: "Snacks",
		description: "Healthy, organic snacks for guilt-free munching.",
		href: "/shop/snacks",
	},
	{
		title: "Household",
		description: "Eco-friendly cleaning and household products.",
		href: "/shop/household",
	},
];

const sustainabilityItems = [
	{
		title: "Our Impact",
		description:
			"Learn about our environmental footprint and sustainability goals.",
		href: "/sustainability/impact",
	},
	{
		title: "Certifications",
		description: "Discover the standards and certifications we uphold.",
		href: "/sustainability/certifications",
	},
	{
		title: "Packaging Initiatives",
		description:
			"How we're reducing waste through innovative packaging solutions.",
		href: "/sustainability/packaging",
	},
	{
		title: "Local Sourcing",
		description: "Our commitment to supporting local farmers and producers.",
		href: "/sustainability/local-sourcing",
	},
	{
		title: "Zero Waste Tips",
		description: "Practical advice for reducing waste in your daily life.",
		href: "/sustainability/zero-waste",
	},
	{
		title: "Community Projects",
		description:
			"How we're giving back and making a difference in communities.",
		href: "/sustainability/community",
	},
];
