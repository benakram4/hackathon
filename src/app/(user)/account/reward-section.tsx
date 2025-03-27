import { Award, Calendar, Gift, Info, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { type User } from "@/lib/auth";

type RewardsSectionProps = {
	user: User;
};
const RewardsSection = ({ user }: RewardsSectionProps) => {
	// Mock rewards data
	const userData = {
		tier: "Silver",
		points: 450,
		nextTier: "Gold",
		pointsToNextTier: 550,
		badges: [
			{
				id: 1,
				name: "First Swap",
				description: "Made your first sustainable swap",
			},
			{
				id: 2,
				name: "Carbon Saver",
				description: "Saved 10kg of CO2 through your choices",
			},
			{
				id: 3,
				name: "Water Guardian",
				description: "Conserved 100L of water through sustainable choices",
			},
		],
		availableRewards: [
			{ id: 1, name: "10% Off Next Order", points: 200, expires: "2023-12-31" },
			{
				id: 2,
				name: "Free Eco-Friendly Tote Bag",
				points: 350,
				expires: "2023-12-31",
			},
			{
				id: 3,
				name: "Carbon Offset for Your Order",
				points: 500,
				expires: "2023-12-31",
			},
		],
	};

	const nextTierProgress = Math.min(
		100,
		Math.round(
			(userData.points / (userData.points + userData.pointsToNextTier)) * 100,
		),
	);

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold">Rewards Program</h2>
				<p className="text-muted-foreground mt-1">
					Earn points for sustainable choices and redeem rewards
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				<Card className="col-span-3">
					<CardHeader className="pb-2">
						<div className="flex items-start justify-between">
							<div>
								<CardTitle className="text-lg">Your Status</CardTitle>
								<CardDescription>Current tier and progress</CardDescription>
							</div>
							<Badge className="bg-[#A5A9B4] px-3 text-white">
								{userData.tier} Member
							</Badge>
						</div>
					</CardHeader>
					<CardContent className="pb-2">
						<div className="mb-2 flex items-center gap-2">
							<h3 className="font-semibold">{userData.tier}</h3>
							<Progress value={nextTierProgress} className="h-2 flex-1" />
							<h3 className="font-semibold">{userData.nextTier}</h3>
						</div>
						<p className="text-muted-foreground text-sm">
							{userData.pointsToNextTier} more points to reach{" "}
							{userData.nextTier}
						</p>
					</CardContent>
					<CardFooter className="flex justify-between">
						<div>
							<span className="text-2xl font-bold">{userData.points}</span>
							<span className="text-muted-foreground ml-1">points</span>
						</div>
						<Button variant="outline" size="sm">
							View Benefits
						</Button>
					</CardFooter>
				</Card>
			</div>

			<div>
				<h3 className="mb-4 flex items-center text-xl font-semibold">
					<Award className="mr-2 h-5 w-5 text-amber-500" />
					Available Rewards
				</h3>
				<div className="grid gap-4 md:grid-cols-3">
					{userData.availableRewards.map((reward) => (
						<Card key={reward.id}>
							<CardHeader className="pb-2">
								<CardTitle className="flex items-center text-lg">
									<Gift className="text-primary mr-2 h-4 w-4" />
									{reward.name}
								</CardTitle>
							</CardHeader>
							<CardContent className="pb-2">
								<div className="mb-1 flex items-center justify-between">
									<span className="font-medium">{reward.points} points</span>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<div className="text-muted-foreground flex items-center text-xs">
													<Calendar className="mr-1 h-3 w-3" />
													Expires:{" "}
													{new Date(reward.expires).toLocaleDateString()}
												</div>
											</TooltipTrigger>
											<TooltipContent>
												<p>
													Expires on{" "}
													{new Date(reward.expires).toLocaleDateString()}
												</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
							</CardContent>
							<CardFooter>
								<Button
									variant="outline"
									size="sm"
									className="w-full"
									disabled={userData.points < reward.points}>
									{userData.points >= reward.points
										? "Redeem"
										: `Need ${reward.points - userData.points} more points`}
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>

			<div>
				<h3 className="mb-4 flex items-center text-xl font-semibold">
					<Trophy className="mr-2 h-5 w-5 text-amber-500" />
					Your Badges
				</h3>
				<div className="grid gap-4 md:grid-cols-3">
					{userData.badges.map((badge) => (
						<Card key={badge.id} className="border-primary/20">
							<CardHeader className="pb-2">
								<CardTitle className="text-md">{badge.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-sm">
									{badge.description}
								</p>
							</CardContent>
						</Card>
					))}

					<Card className="bg-muted/50 border-dashed">
						<CardHeader className="pb-2">
							<CardTitle className="text-md text-muted-foreground">
								Next Badge
							</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col items-center justify-center py-4">
							<Info className="text-muted-foreground/50 mb-2 h-8 w-8" />
							<p className="text-muted-foreground text-center text-sm">
								Keep making sustainable choices to unlock more badges
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default RewardsSection;
