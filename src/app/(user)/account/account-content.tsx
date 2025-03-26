import { type User } from "@/lib/auth";

import AddressSection from "./address-section";
import ImpactSection from "./impact-section";
import OrderHistorySection from "./order-history-section";
import PreferencesSection from "./preference-section";
import ProfileSection from "./profile-section";
import RewardsSection from "./reward-section";

type AccountContentProps = {
	section:
		| "profile"
		| "address"
		| "orders"
		| "impact"
		| "rewards"
		| "preferences";
	user: User;
};

const AccountContent = ({ section, user }: AccountContentProps) => {
	switch (section) {
		case "address":
			return <AddressSection user={user} />;
		case "orders":
			return <OrderHistorySection user={user} />;
		case "impact":
			return <ImpactSection user={user} />;
		case "rewards":
			return <RewardsSection user={user} />;
		case "preferences":
			return <PreferencesSection />;
		default:
			return <ProfileSection user={user} />;
	}
};

export default AccountContent;
