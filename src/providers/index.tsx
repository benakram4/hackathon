"use client";

import type * as React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";

import InitializeCart from "@/app/cart/initialize-cart";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/cart-context";
import { getQueryClient } from "@/providers/get-query-client";

import { PostHogProvider } from "./posthog";

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<PostHogProvider>
			<QueryClientProvider client={queryClient}>
				<JotaiProvider>
					<TooltipProvider>
						<CartProvider>
							<InitializeCart />
							<Sonner />
							{children}
						</CartProvider>
					</TooltipProvider>
				</JotaiProvider>
			</QueryClientProvider>
		</PostHogProvider>
	);
}
