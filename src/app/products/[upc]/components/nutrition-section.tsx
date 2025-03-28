/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdditivesCard } from "./cards/additives-card";
import { DisclaimerCard } from "./cards/disclaimer-card";
import { EnvironmentalCard } from "./cards/environmental-card";
import { IngredientsCard } from "./cards/ingredients-card";
import { NovaGroupCard } from "./cards/nova-group-card";
import { NutriScoreCard } from "./cards/nutri-score-card";
import { NutrientLevelsCard } from "./cards/nutrient-levels-card";
import { NutritionTable } from "./nutrition-table";

export function NutritionSection({
	nutritionData,
	combinedOffData,
}: {
	nutritionData: any;
	combinedOffData: any;
}) {
	return (
		<div className="mt-12">
			<h2 className="mb-6 text-2xl font-bold">
				Nutrition & Environmental Information
			</h2>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{/* Nutri-Score */}
				<NutriScoreCard nutritionData={nutritionData} />

				{/* NOVA Group */}
				<NovaGroupCard nutritionData={nutritionData} />

				{/* Nutrient Levels */}
				<NutrientLevelsCard nutritionData={nutritionData} />

				{/* Additives */}
				<AdditivesCard nutritionData={nutritionData} />

				{/* Ingredients */}
				<IngredientsCard nutritionData={nutritionData} />

				{/* Environmental & Packaging */}
				<EnvironmentalCard nutritionData={nutritionData} />

				{/* Nutritional Facts Table */}
				<NutritionTable combinedOffData={combinedOffData} />

				{/* Disclaimer */}
				<DisclaimerCard />
			</div>
		</div>
	);
}
