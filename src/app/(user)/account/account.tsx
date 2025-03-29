"use client";

import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { type User } from "@/lib/auth";

import AccountContent from "./account-content";
import { AccountSidebar } from "./account-sidebar";

interface AccountProps {
	user: User;
}
type AccountSection =
	| "profile"
	| "address"
	| "orders"
	| "impact"
	| "rewards"
	| "preferences"
	| "favorites";

const Account = ({ user }: AccountProps) => {
	const [activeSection, setActiveSection] = useState<AccountSection>("profile");

	return (
		<SidebarProvider className="flex min-h-[calc(100vh-var(--header-height)-var(--footer-height))] flex-col">
			<div className="flex flex-1">
				<AccountSidebar
					activeSection={activeSection}
					setActiveSection={setActiveSection}
				/>
				<ScrollArea className="!h-[100svh] !w-full p-4">
					<SidebarInset className="container mx-auto !w-full px-4 py-8">
						<AccountContent user={user} section={activeSection} />
					</SidebarInset>
				</ScrollArea>
			</div>
		</SidebarProvider>
	);
};

export default Account;
