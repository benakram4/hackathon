"use client";

import type * as React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";

import { getQueryClient } from "@/providers/get-query-client";

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<JotaiProvider>{children}</JotaiProvider>
		</QueryClientProvider>
	);
}
