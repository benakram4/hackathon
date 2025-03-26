"use client";

// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Leaf, Menu, Search, ShoppingCart, User } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import {
// 	NavigationMenu,
// 	NavigationMenuContent,
// 	NavigationMenuItem,
// 	NavigationMenuLink,
// 	NavigationMenuList,
// 	NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
// import {
// 	Sheet,
// 	SheetContent,
// 	SheetTitle,
// 	SheetTrigger,
// } from "@/components/ui/sheet";
// import { useWalmartCategories } from "@/hooks";
// import { cn } from "@/lib/utils";
// import { RELEVANT_CATEGORIES } from "@/lib/walmart/constants";
// export default function MainNav() {
// 	const [isScrolled, setIsScrolled] = useState(false);
// 	const [cartCount, setCartCount] = useState(0);
// 	const [isSearchOpen, setIsSearchOpen] = useState(false);
// 	const walmartCategories = useWalmartCategories();
// 	// Handle scroll effect for fixed navigation
// 	useEffect(() => {
// 		const handleScroll = () => {
// 			setIsScrolled(window.scrollY > 10);
// 		};
// 		window.addEventListener("scroll", handleScroll);
// 		return () => window.removeEventListener("scroll", handleScroll);
// 	}, []);
// 	// Simulate cart count for demo purposes
// 	useEffect(() => {
// 		setCartCount(3);
// 	}, []);
// 	return (
// 		<header
// 			className={cn(
// 				"fixed top-0 right-0 left-0 z-50 transition-all duration-300",
// 				isScrolled
// 					? "bg-white/95 shadow-sm backdrop-blur-sm dark:bg-gray-950/95"
// 					: "bg-white dark:bg-gray-950"
// 			)}>
// 			<div className="container mx-auto px-4">
// 				<div className="flex h-16 items-center justify-between">
// 					{/* Logo */}
// 					<Link href="/" className="flex items-center space-x-2">
// 						<Leaf className="text-primary h-6 w-6" />
// 						<span className="text-xl font-semibold">EcoEats</span>
// 					</Link>
// 					{/* Desktop Navigation */}
// 					<div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
// 						<NavigationMenu>
// 							<NavigationMenuList>
// 								<NavigationMenuItem>
// 									<NavigationMenuTrigger className="text-base">
// 										Shop
// 									</NavigationMenuTrigger>
// 									<NavigationMenuContent>
// 										<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
// 											{Array.isArray(walmartCategories?.data) &&
// 												walmartCategories.data.map((category) => (
// 													<li key={category.id}>
// 														<NavigationMenuLink asChild>
// 															<Link
// 																href={"/"}
// 																className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none">
// 																<div className="text-sm leading-none font-medium">
// 																	{category.name}
// 																</div>
// 																<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
// 																	{RELEVANT_CATEGORIES[category.id] ?? ""}
// 																</p>
// 															</Link>
// 														</NavigationMenuLink>
// 													</li>
// 												))}
// 										</ul>
// 									</NavigationMenuContent>
// 								</NavigationMenuItem>
// 								<NavigationMenuItem>
// 									<NavigationMenuTrigger className="text-base">
// 										Sustainability
// 									</NavigationMenuTrigger>
// 									<NavigationMenuContent>
// 										<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
// 											{sustainabilityItems.map((item) => (
// 												<li key={item.title}>
// 													<NavigationMenuLink asChild>
// 														<Link
// 															href={item.href}
// 															className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none">
// 															<div className="text-sm leading-none font-medium">
// 																{item.title}
// 															</div>
// 															<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
// 																{item.description}
// 															</p>
// 														</Link>
// 													</NavigationMenuLink>
// 												</li>
// 											))}
// 										</ul>
// 									</NavigationMenuContent>
// 								</NavigationMenuItem>
// 							</NavigationMenuList>
// 						</NavigationMenu>
// 					</div>
// 					{/* Search, Account, Cart */}
// 					<div className="flex items-center space-x-4">
// 						<div className="relative hidden w-full max-w-xs md:block">
// 							<Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
// 							<Input
// 								type="search"
// 								placeholder="Search sustainable products..."
// 								className="bg-muted w-full rounded-full pl-8 focus-visible:ring-green-500 md:w-[200px] lg:w-[250px]"
// 							/>
// 						</div>
// 						<Button
// 							variant="ghost"
// 							size="icon"
// 							aria-label="Search"
// 							className="md:hidden"
// 							onClick={() => setIsSearchOpen(true)}>
// 							<Search className="h-5 w-5" />
// 						</Button>
// 						<Button variant="ghost" size="icon" aria-label="Account">
// 							<User className="h-5 w-5" />
// 						</Button>
// 						<Button
// 							variant="ghost"
// 							size="icon"
// 							aria-label="Shopping cart"
// 							className="relative">
// 							<ShoppingCart className="h-5 w-5" />
// 							{cartCount > 0 && (
// 								<Badge className="bg-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
// 									{cartCount}
// 								</Badge>
// 							)}
// 						</Button>
// 						{/* Mobile Menu */}
// 						<Sheet>
// 							<SheetTrigger asChild>
// 								<Button
// 									variant="ghost"
// 									size="icon"
// 									className="md:hidden"
// 									aria-label="Menu">
// 									<Menu className="h-5 w-5" />
// 								</Button>
// 							</SheetTrigger>
// 							<SheetContent side="right" className="w-[300px] sm:w-[350px]">
// 								<SheetTitle className="sr-only">Navigation Menu</SheetTitle>
// 								<div className="flex h-full flex-col">
// 									<div className="px-4 py-6">
// 										<div className="mb-4 flex items-center justify-between">
// 											<Link href="/" className="flex items-center space-x-2">
// 												<Leaf className="text-primary h-6 w-6" />
// 												<span className="text-xl font-semibold">EcoEats</span>
// 											</Link>
// 										</div>
// 										<div className="relative mb-6">
// 											<Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
// 											<Input
// 												type="search"
// 												placeholder="Search sustainable products..."
// 												className="bg-muted w-full rounded-full pl-8"
// 											/>
// 										</div>
// 										<nav className="flex flex-col space-y-6">
// 											<div>
// 												<h3 className="mb-3 text-lg font-semibold">Shop</h3>
// 												<ul className="space-y-3">
// 													{shopCategories.map((category) => (
// 														<li key={category.title}>
// 															<Link
// 																href={category.href}
// 																className="text-muted-foreground hover:text-foreground">
// 																{category.title}
// 															</Link>
// 														</li>
// 													))}
// 												</ul>
// 											</div>
// 											<div>
// 												<h3 className="mb-3 text-lg font-semibold">
// 													Sustainability
// 												</h3>
// 												<ul className="space-y-3">
// 													{sustainabilityItems.map((item) => (
// 														<li key={item.title}>
// 															<Link
// 																href={item.href}
// 																className="text-muted-foreground hover:text-foreground">
// 																{item.title}
// 															</Link>
// 														</li>
// 													))}
// 												</ul>
// 											</div>
// 										</nav>
// 									</div>
// 									<div className="mt-auto border-t p-4">
// 										<div className="flex flex-col space-y-3">
// 											<Button variant="outline">
// 												<User className="mr-2 h-4 w-4" />
// 												My Account
// 											</Button>
// 											<Button>
// 												<ShoppingCart className="mr-2 h-4 w-4" />
// 												View Cart ({cartCount})
// 											</Button>
// 										</div>
// 									</div>
// 								</div>
// 							</SheetContent>
// 						</Sheet>
// 					</div>
// 				</div>
// 			</div>
// 			{/* Mobile Search Dialog */}
// 			<Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
// 				<DialogContent className="w-[90%] border-none bg-transparent p-0 shadow-none sm:max-w-[100%]">
// 					<div className="relative w-full px-4 py-4">
// 						<Search className="text-muted-foreground absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 transform" />
// 						<Input
// 							type="search"
// 							placeholder="Search sustainable products..."
// 							className="mx-4 w-[calc(100%-2rem)] rounded-md border-none bg-transparent py-8 pr-4 pl-10 text-lg ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
// 							autoFocus
// 						/>
// 					</div>
// 				</DialogContent>
// 			</Dialog>
// 		</header>
// 	);
// }
// const shopCategories = [
// 	{
// 		title: "Produce",
// 		description:
// 			"Fresh, organic fruits and vegetables sourced from local farms.",
// 		href: "/shop/produce",
// 	},
// 	{
// 		title: "Dairy & Eggs",
// 		description: "Ethically produced dairy products and free-range eggs.",
// 		href: "/shop/dairy-eggs",
// 	},
// 	{
// 		title: "Meat & Seafood",
// 		description: "Sustainably raised meat and responsibly sourced seafood.",
// 		href: "/shop/meat-seafood",
// 	},
// 	{
// 		title: "Pantry",
// 		description:
// 			"Organic staples and specialty items for your sustainable kitchen.",
// 		href: "/shop/pantry",
// 	},
// 	{
// 		title: "Beverages",
// 		description:
// 			"Organic, fair-trade coffee, tea, and other refreshing drinks.",
// 		href: "/shop/beverages",
// 	},
// 	{
// 		title: "Frozen Foods",
// 		description: "Convenient, organic frozen meals and ingredients.",
// 		href: "/shop/frozen",
// 	},
// 	{
// 		title: "Snacks",
// 		description: "Healthy, organic snacks for guilt-free munching.",
// 		href: "/shop/snacks",
// 	},
// 	{
// 		title: "Household",
// 		description: "Eco-friendly cleaning and household products.",
// 		href: "/shop/household",
// 	},
// ];
// const sustainabilityItems = [
// 	{
// 		title: "Our Impact",
// 		description:
// 			"Learn about our environmental footprint and sustainability goals.",
// 		href: "/sustainability/impact",
// 	},
// 	{
// 		title: "Certifications",
// 		description: "Discover the standards and certifications we uphold.",
// 		href: "/sustainability/certifications",
// 	},
// 	{
// 		title: "Packaging Initiatives",
// 		description:
// 			"How we're reducing waste through innovative packaging solutions.",
// 		href: "/sustainability/packaging",
// 	},
// 	{
// 		title: "Local Sourcing",
// 		description: "Our commitment to supporting local farmers and producers.",
// 		href: "/sustainability/local-sourcing",
// 	},
// 	{
// 		title: "Zero Waste Tips",
// 		description: "Practical advice for reducing waste in your daily life.",
// 		href: "/sustainability/zero-waste",
// 	},
// 	{
// 		title: "Community Projects",
// 		description:
// 			"How we're giving back and making a difference in communities.",
// 		href: "/sustainability/community",
// 	},
// ];
import Link from "next/link";

import { ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";

// ! temporary navigation bar

const SiteHeader = () => {
	const { totalItems } = useCart();

	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex h-16 w-full items-center border-b backdrop-blur">
			<div className="flex h-[--header-height] w-full items-center justify-between gap-2 px-4">
				<Link href="/" className="flex items-center gap-2">
					<span className="text-primary text-xl font-semibold">EcoEats</span>
				</Link>

				<nav className="hidden items-center gap-6 md:flex">
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
						href="#trending"
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
