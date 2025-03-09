"use client";

import type * as React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";

import { getQueryClient } from "@/providers/get-query-client";

import { OFFProvider } from "./off-provider";
import { PostHogProvider } from "./posthog";

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<PostHogProvider>
			<QueryClientProvider client={queryClient}>
				<JotaiProvider>
					<OFFProvider>{children}</OFFProvider>
				</JotaiProvider>
			</QueryClientProvider>
		</PostHogProvider>
	);
}
