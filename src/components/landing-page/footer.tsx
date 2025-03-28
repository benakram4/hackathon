import {
	Facebook,
	Instagram,
	Mail,
	Send,
	Twitter,
	Youtube,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-secondary relative z-49 h-[var(--footer-height)] py-8">
			<div className="bg-secondary container mx-auto">
				<div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					{/* Brand & Description */}
					<div className="space-y-4">
						<div className="text-xl font-semibold tracking-tight">
							Eco<span className="text-primary">Eats</span>
						</div>
						<p className="text-muted-foreground text-sm">
							Helping you make sustainable food choices that are better for you
							and the planet. Join our community of eco-conscious shoppers.
						</p>
						<div className="flex space-x-4 pt-2">
							<a
								href="#"
								className="bg-foreground/5 hover:bg-primary hover:text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full transition-colors"
								aria-label="Instagram">
								<Instagram className="h-4 w-4" />
							</a>
							<a
								href="#"
								className="bg-foreground/5 hover:bg-primary hover:text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full transition-colors"
								aria-label="Twitter">
								<Twitter className="h-4 w-4" />
							</a>
							<a
								href="#"
								className="bg-foreground/5 hover:bg-primary hover:text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full transition-colors"
								aria-label="Facebook">
								<Facebook className="h-4 w-4" />
							</a>
							<a
								href="#"
								className="bg-foreground/5 hover:bg-primary hover:text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full transition-colors"
								aria-label="YouTube">
								<Youtube className="h-4 w-4" />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="mb-4 font-semibold">Quick Links</h4>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-muted-foreground hover:text-primary text-sm transition-colors">
									Shop All Products
								</a>
							</li>
							<li>
								<a
									href="#alternatives"
									className="text-muted-foreground hover:text-primary text-sm transition-colors">
									Find Alternatives
								</a>
							</li>
							<li>
								<a
									href="#blog"
									className="text-muted-foreground hover:text-primary text-sm transition-colors">
									Blog & Resources
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-muted-foreground hover:text-primary text-sm transition-colors">
									About Our Mission
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-muted-foreground hover:text-primary text-sm transition-colors">
									Sustainability Criteria
								</a>
							</li>
						</ul>
					</div>

					{/* Legal */}
					<div>
						<h4 className="mb-4 font-semibold">Legal & Help</h4>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-muted-foreground hover:text-primary text-sm transition-colors">
									Privacy Policy
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-muted-foreground hover:text-primary text-sm transition-colors">
									Terms of Service
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-muted-foreground hover:text-primary text-sm transition-colors">
									Shipping Information
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-muted-foreground hover:text-primary text-sm transition-colors">
									FAQs
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-muted-foreground hover:text-primary text-sm transition-colors">
									Contact Support
								</a>
							</li>
						</ul>
					</div>

					{/* Newsletter */}
					<div>
						<h4 className="mb-4 font-semibold">Stay Connected</h4>
						<p className="text-muted-foreground mb-4 text-sm">
							Subscribe to our newsletter for sustainable tips and exclusive
							offers
						</p>
						<div className="flex gap-2">
							<div className="relative flex-grow">
								<Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
								<Input
									type="email"
									placeholder="Your email"
									className="h-10 bg-white pl-10"
								/>
							</div>
							<Button size="sm" className="h-10">
								<Send className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="flex flex-col items-center justify-between border-t pt-6 md:flex-row">
					<p className="text-muted-foreground mb-4 text-xs md:mb-0">
						© {currentYear} EcoEats. All rights reserved.
					</p>
					<div className="text-muted-foreground flex flex-wrap gap-4 text-xs">
						<a href="#" className="hover:text-primary transition-colors">
							Privacy
						</a>
						<a href="#" className="hover:text-primary transition-colors">
							Terms
						</a>
						<a href="#" className="hover:text-primary transition-colors">
							Cookies
						</a>
						<a href="#" className="hover:text-primary transition-colors">
							Accessibility
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
