"use client";

import { useState } from "react";

import {
	Award,
	BarChart,
	LogOut,
	MapPin,
	Package,
	Trash2,
	User as UserIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from "@/components/ui/sidebar";
import { type User, deleteSession } from "@/lib/auth";

// Import the User type

// Import the server action directly
import AccountContent from "./account-content";

interface AccountProps {
	user: User; // Add user prop
}
type AccountSection = "profile" | "address" | "orders" | "impact" | "rewards";

const Account = ({ user }: AccountProps) => {
	const [activeSection, setActiveSection] = useState<AccountSection>("profile");

	return (
		<div className="bg-background min-h-screen w-full">
			<SidebarProvider>
				<div className="flex min-h-[calc(100vh-4rem)] w-full">
					<Sidebar>
						<SidebarContent>
							<SidebarGroup>
								<SidebarGroupLabel>Account</SidebarGroupLabel>
								<SidebarGroupContent>
									<SidebarMenu>
										<SidebarMenuItem>
											<SidebarMenuButton
												onClick={() => setActiveSection("profile")}
												isActive={activeSection === "profile"}
												tooltip="Profile">
												<UserIcon />
												<span>Profile</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												onClick={() => setActiveSection("address")}
												isActive={activeSection === "address"}
												tooltip="Address">
												<MapPin />
												<span>Address</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												onClick={() => setActiveSection("orders")}
												isActive={activeSection === "orders"}
												tooltip="Order History">
												<Package />
												<span>Order History</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												onClick={() => setActiveSection("impact")}
												isActive={activeSection === "impact"}
												tooltip="Impact">
												<BarChart />
												<span>Impact</span>
											</SidebarMenuButton>
										</SidebarMenuItem>

										<SidebarMenuItem>
											<SidebarMenuButton
												onClick={() => setActiveSection("rewards")}
												isActive={activeSection === "rewards"}
												tooltip="Rewards">
												<Award />
												<span>Rewards Program</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						</SidebarContent>

						<SidebarFooter>
							<div className="p-2">
								<form action={deleteSession}>
									<Button
										type="submit"
										variant="destructive"
										className="mb-2 w-full">
										<LogOut className="mr-2 h-4 w-4" />
										Logout
									</Button>
								</form>
								<Button variant="outline" className="w-full">
									<Trash2 className="mr-2 h-4 w-4" />
									Delete Account
								</Button>
							</div>
						</SidebarFooter>
					</Sidebar>

					<main className="flex-1 overflow-auto p-6">
						<div className="mx-auto max-w-4xl">
							<AccountContent user={user} section={activeSection} />
						</div>
					</main>
				</div>
			</SidebarProvider>
		</div>
	);
};

export default Account;
