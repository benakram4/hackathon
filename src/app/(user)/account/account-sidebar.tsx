import {
	Award,
	BarChart,
	MapPin,
	Package,
	Settings,
	UserIcon,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

type AccountSection =
	| "profile"
	| "address"
	| "orders"
	| "impact"
	| "rewards"
	| "preferences";

type AccountSidebarProps = {
	activeSection: AccountSection;
	setActiveSection: (section: AccountSection) => void;
	prop?: React.ComponentProps<typeof Sidebar>;
};

export function AccountSidebar({
	activeSection,
	setActiveSection,
	...props
}: AccountSidebarProps) {
	return (
		<Sidebar
			variant="sidebar"
			className="top-[var(--header-height)] bottom-[var(--footer-height)] !max-h-[calc(100svh-var(--header-height)-var(--footer-height))] !min-h-[calc(100svh-var(--header-height))] overflow-auto"
			{...props}>
			<SidebarContent className="flex !h-full flex-1">
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
									onClick={() => setActiveSection("preferences")}
									isActive={activeSection === "preferences"}
									tooltip="Preferences">
									<Settings />
									<span>Preferences</span>
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
		</Sidebar>
	);
}
