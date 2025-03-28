/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function EnvironmentalCard({ nutritionData }: { nutritionData: any }) {
	const getNutriScoreColor = (grade?: string) => {
		if (!grade) return "bg-gray-500";

		const colors: Record<string, string> = {
			a: "bg-green-500",
			b: "bg-lime-500",
			c: "bg-yellow-500",
			d: "bg-orange-500",
			e: "bg-red-500",
		};
		return colors[grade.toLowerCase()] || "bg-gray-500";
	};

	return (
		<Card>
			<CardContent className="pt-6">
				<h3 className="mb-4 text-lg font-semibold">
					Environmental Impact & Packaging
				</h3>
				<div className="space-y-4">
					{nutritionData.servingSize && (
						<div>
							<span className="font-medium">Serving Size:</span>
							<span className="ml-2">{nutritionData.servingSize}</span>
						</div>
					)}
					{nutritionData.environmentalScore.grade && (
						<div>
							<span className="font-medium">Environmental Score:</span>
							<Badge
								className={`ml-2 ${getNutriScoreColor(
									nutritionData.environmentalScore.grade,
								)}`}>
								{nutritionData.environmentalScore.grade.toUpperCase()}
							</Badge>
						</div>
					)}
					{nutritionData.environmentalScore.title &&
						nutritionData.environmentalScore.title !==
							"Environmental Score" && (
							<div>
								<span className="font-medium">Status:</span>
								<span className="ml-2">
									{nutritionData.environmentalScore.title}
								</span>
							</div>
						)}
					{nutritionData.packaging.materials &&
						nutritionData.packaging.materials.length > 0 && (
							<div>
								<span className="font-medium">Packaging Material:</span>
								<span className="ml-2">
									{nutritionData.packaging.materials.join(", ")}
								</span>
							</div>
						)}
					{nutritionData.packaging.recyclability && (
						<div>
							<span className="font-medium">Recyclability:</span>
							<span className="ml-2">
								{nutritionData.packaging.recyclability}
							</span>
						</div>
					)}
					{!nutritionData.environmentalScore.grade &&
						!nutritionData.packaging.materials &&
						!nutritionData.packaging.recyclability && (
							<p className="text-muted-foreground">
								Environmental impact information not available.
							</p>
						)}
				</div>
			</CardContent>
		</Card>
	);
}
