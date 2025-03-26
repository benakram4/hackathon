/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function NutrientLevelsCard({ nutritionData }: { nutritionData: any }) {
	const getNutrientLevelColor = (level?: string) => {
		if (!level) return "bg-gray-500";

		const colors: Record<string, string> = {
			low: "bg-green-500",
			moderate: "bg-yellow-500",
			high: "bg-red-500",
		};
		return colors[level.toLowerCase()] || "bg-gray-500";
	};

	return (
		<Card>
			<CardContent className="pt-6">
				<h3 className="mb-4 text-lg font-semibold">Nutrient Levels</h3>
				<div className="space-y-3">
					{nutritionData.nutrientLevels.fat && (
						<div className="flex items-center justify-between">
							<span>Fat</span>
							<Badge
								className={getNutrientLevelColor(
									nutritionData.nutrientLevels.fat.level,
								)}>
								{nutritionData.nutrientLevels.fat.level}
								{nutritionData.nutrientLevels.fat.value !== undefined &&
									` (${nutritionData.nutrientLevels.fat.value}%)`}
							</Badge>
						</div>
					)}
					{nutritionData.nutrientLevels.saturatedFat && (
						<div className="flex items-center justify-between">
							<span>Saturated Fat</span>
							<Badge
								className={getNutrientLevelColor(
									nutritionData.nutrientLevels.saturatedFat.level,
								)}>
								{nutritionData.nutrientLevels.saturatedFat.level}
								{nutritionData.nutrientLevels.saturatedFat.value !==
									undefined &&
									` (${nutritionData.nutrientLevels.saturatedFat.value}%)`}
							</Badge>
						</div>
					)}
					{nutritionData.nutrientLevels.sugars && (
						<div className="flex items-center justify-between">
							<span>Sugars</span>
							<Badge
								className={getNutrientLevelColor(
									nutritionData.nutrientLevels.sugars.level,
								)}>
								{nutritionData.nutrientLevels.sugars.level}
								{nutritionData.nutrientLevels.sugars.value !== undefined &&
									` (${nutritionData.nutrientLevels.sugars.value}%)`}
							</Badge>
						</div>
					)}
					{nutritionData.nutrientLevels.salt && (
						<div className="flex items-center justify-between">
							<span>Salt</span>
							<Badge
								className={getNutrientLevelColor(
									nutritionData.nutrientLevels.salt.level,
								)}>
								{nutritionData.nutrientLevels.salt.level}
								{nutritionData.nutrientLevels.salt.value !== undefined &&
									` (${nutritionData.nutrientLevels.salt.value}%)`}
							</Badge>
						</div>
					)}
					{Object.keys(nutritionData.nutrientLevels).length === 0 && (
						<p className="text-muted-foreground">
							No nutrient level information available.
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
