import { useCallback, useEffect, useState } from "react";

import { CircleOff, Droplets, Sprout, Trees } from "lucide-react";

import { cn } from "@/lib/utils";

interface Stat {
	id: string;
	icon: React.ElementType;
	value: number;
	end: number;
	label: string;
	color: string;
}

const stats: Stat[] = [
	{
		id: "co2",
		icon: CircleOff,
		value: 0,
		end: 12475,
		label: "kg CO₂ Saved",
		color: "bg-emerald-500",
	},
	{
		id: "trees",
		icon: Trees,
		value: 0,
		end: 587,
		label: "Trees Preserved",
		color: "bg-green-600",
	},
	{
		id: "water",
		icon: Droplets,
		value: 0,
		end: 1250000,
		label: "Liters of Water Saved",
		color: "bg-blue-500",
	},
	{
		id: "farms",
		icon: Sprout,
		value: 0,
		end: 128,
		label: "Local Farms Supported",
		color: "bg-amber-500",
	},
];

const ImpactMetrics = () => {
	const [animatedStats, setAnimatedStats] = useState(stats);
	const [hasAnimated, setHasAnimated] = useState(false);
	const animateStats = useCallback(() => {
		const duration = 2000; // animation duration in ms
		const steps = 60; // number of steps to reach the target value
		const interval = duration / steps;

		let currentStep = 0;

		const timer = setInterval(() => {
			currentStep++;

			setAnimatedStats((prevStats) =>
				prevStats.map((stat) => ({
					...stat,
					value: Math.round((stat.end / steps) * currentStep),
				}))
			);

			if (currentStep >= steps) {
				clearInterval(timer);
				setAnimatedStats(stats.map((stat) => ({ ...stat, value: stat.end })));
			}
		}, interval);
	}, [stats]);

	useEffect(() => {
		const handleScroll = () => {
			if (hasAnimated) return;

			const element = document.getElementById("impact-metrics");
			if (element) {
				const rect = element.getBoundingClientRect();
				const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

				if (isVisible) {
					animateStats();
					setHasAnimated(true);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Check on mount

		return () => window.removeEventListener("scroll", handleScroll);
	}, [hasAnimated, animateStats]);

	return (
		<section
			id="impact-metrics"
			className="bg-primary/5 relative overflow-hidden py-20">
			{/* Background decorations */}
			<div className="absolute top-0 left-0 h-full w-full opacity-5">
				<div className="border-primary absolute top-0 left-1/4 h-64 w-64 rounded-full border-4" />
				<div className="border-accent absolute right-1/4 bottom-1/4 h-40 w-40 rounded-full border-2" />
				<div className="bg-secondary absolute top-1/3 right-1/3 h-24 w-24 rounded-full" />
			</div>

			<div className="relative container mx-auto px-4">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-3xl font-bold md:text-4xl">
						Our Collective <span className="text-primary">Impact</span>
					</h2>
					<p className="text-muted-foreground mx-auto max-w-2xl">
						Together, our community&apos;s sustainable choices are making a real
						difference
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{animatedStats.map((stat) => {
						const Icon = stat.icon;
						return (
							<div
								key={stat.id}
								className="group bg-background relative rounded-2xl border p-6 text-center shadow-sm transition-shadow hover:shadow-md">
								<div
									className={cn(
										"mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full",
										"bg-opacity-10 text-background",
										stat.color
									)}>
									<Icon className={cn("h-8 w-8")} />
								</div>
								<h3 className="mb-1 text-3xl font-bold">
									{stat.id === "water"
										? `${(stat.value / 1000).toFixed(0)}K`
										: stat.value.toLocaleString()}
								</h3>
								<p className="text-muted-foreground">{stat.label}</p>

								{/* Animated background on hover */}
								<div
									className={cn(
										"absolute bottom-0 left-0 h-1 w-full transition-all duration-700 group-hover:h-full",
										"rounded-b-2xl opacity-0 group-hover:opacity-5",
										stat.color
									)}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default ImpactMetrics;
