"use client";

import { useEffect, useState } from "react";

import { BarChart, Droplets, Leaf, Trash2 } from "lucide-react";
import {
	Bar,
	CartesianGrid,
	Cell,
	Legend,
	Line,
	LineChart,
	Pie,
	PieChart,
	BarChart as RechartsBarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { type User } from "@/lib/auth";
import { getImpactData } from "@/lib/database/actions";
import { type UserImpact } from "@/types/user";

// Mock data for charts
const monthlyImpactData = [
	{ name: "Jan", co2: 3.2, water: 180, waste: 2.1 },
	{ name: "Feb", co2: 5.8, water: 220, waste: 3.2 },
	{ name: "Mar", co2: 7.3, water: 280, waste: 4.5 },
	{ name: "Apr", co2: 8.9, water: 340, waste: 5.2 },
	{ name: "May", co2: 11.2, water: 390, waste: 6.8 },
	{ name: "Jun", co2: 14.5, water: 450, waste: 7.3 },
];

const impactByCategory = [
	{ name: "Meat & Protein", value: 42 },
	{ name: "Produce", value: 18 },
	{ name: "Dairy", value: 25 },
	{ name: "Packaged Foods", value: 10 },
	{ name: "Beverages", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9146FF"];
type ImpactSectionProps = {
	user: User;
};
const ImpactSection = ({ user }: ImpactSectionProps) => {
	const [impactData, setImpactData] = useState<UserImpact | null>(null);

	useEffect(() => {
		const fetchImpactData = async () => {
			const data = await getImpactData(user.$id);
			setImpactData(data);
		};

		void fetchImpactData();
	}, [user.$id]);

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold">Your Environmental Impact</h2>
				<p className="text-muted-foreground mt-1">
					See how your sustainable choices are making a difference
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="flex items-center text-lg">
							<Leaf className="mr-2 h-4 w-4 text-green-500" />
							CO2 Reduction
						</CardTitle>
						<CardDescription>Total carbon emissions saved</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{impactData?.co2.toFixed(1)}kg
						</div>
						<p className="text-muted-foreground text-sm">
							Equivalent to planting{" "}
							{impactData?.co2 ? Math.round(impactData.co2 / 0.5) : 0} trees
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="flex items-center text-lg">
							<Droplets className="mr-2 h-4 w-4 text-blue-500" />
							Water Saved
						</CardTitle>
						<CardDescription>Total water conservation</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{impactData?.water} liters</div>
						<p className="text-muted-foreground text-sm">
							Equivalent to{" "}
							{impactData?.water ? Math.round(impactData.water / 150) : 0}{" "}
							showers
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="flex items-center text-lg">
							<Trash2 className="mr-2 h-4 w-4 text-amber-500" />
							Waste Reduced
						</CardTitle>
						<CardDescription>Less packaging waste</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{impactData?.waste.toFixed(1)}kg
						</div>
						<p className="text-muted-foreground text-sm">
							{impactData?.waste ? Math.round(impactData.waste * 3) : 0} less
							plastic items
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card className="col-span-2">
					<CardHeader>
						<CardTitle className="flex items-center">
							<BarChart className="mr-2 h-5 w-5" />
							Monthly Impact
						</CardTitle>
						<CardDescription>
							Your environmental savings over the last 6 months
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-80">
							<ChartContainer
								config={{
									co2: { label: "CO2 (kg)", color: "#16a34a" },
									water: { label: "Water (10L)", color: "#0ea5e9" },
									waste: { label: "Waste (kg)", color: "#f59e0b" },
								}}>
								<RechartsBarChart
									data={monthlyImpactData}
									margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip content={<ChartTooltipContent />} />
									<Legend />
									<Bar dataKey="co2" name="CO2 (kg)" fill="var(--color-co2)" />
									<Bar
										dataKey="water"
										name="Water (10L)"
										fill="var(--color-water)"
									/>
									<Bar
										dataKey="waste"
										name="Waste (kg)"
										fill="var(--color-waste)"
									/>
								</RechartsBarChart>
							</ChartContainer>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Impact by Category</CardTitle>
						<CardDescription>
							{"Where you're making the biggest difference"}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-64">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={impactByCategory}
										cx="50%"
										cy="50%"
										labelLine={false}
										outerRadius={80}
										fill="#8884d8"
										dataKey="value"
										label={({ name, percent }) =>
											`${name} ${(percent * 100).toFixed(0)}%`
										}>
										{impactByCategory.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={COLORS[index % COLORS.length]}
											/>
										))}
									</Pie>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Sustainability Trends</CardTitle>
						<CardDescription>Your progress over time</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-64">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart
									data={monthlyImpactData}
									margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Line
										type="monotone"
										dataKey="co2"
										stroke="#16a34a"
										activeDot={{ r: 8 }}
									/>
									<Line type="monotone" dataKey="waste" stroke="#f59e0b" />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ImpactSection;
