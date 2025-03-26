/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";

export function NutriScoreCard({ nutritionData }: { nutritionData: any }) {
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
					{nutritionData.nutriScore.title || "Nutri-Score"}
				</h3>
				<div className="mb-4 flex">
					{["a", "b", "c", "d", "e"].map((score) => (
						<div
							key={score}
							className={`flex h-10 flex-1 items-center justify-center ${
								score === nutritionData.nutriScore.grade?.toLowerCase()
									? `${getNutriScoreColor(score)} font-bold text-white`
									: "bg-gray-100"
							}`}>
							{score.toUpperCase()}
						</div>
					))}
				</div>
				<div className="text-muted-foreground text-sm">
					<p>
						{nutritionData.nutriScore.subtitle ||
							"Nutri-Score is a front-of-pack label evaluating the overall nutritional quality of food products."}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
