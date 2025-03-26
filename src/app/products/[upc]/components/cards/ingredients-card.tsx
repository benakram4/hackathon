/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";

export function IngredientsCard({ nutritionData }: { nutritionData: any }) {
	return (
		<Card>
			<CardContent className="pt-6">
				<h3 className="mb-4 text-lg font-semibold">Ingredients</h3>
				{nutritionData.ingredients.list ? (
					<div className="space-y-2">
						{nutritionData.ingredients.count !== undefined && (
							<p className="font-medium">
								{nutritionData.ingredients.count} ingredients
							</p>
						)}
						<div
							className="text-muted-foreground text-sm"
							dangerouslySetInnerHTML={{
								__html: nutritionData.ingredients.list,
							}}
						/>
					</div>
				) : (
					<p className="text-muted-foreground text-sm">
						Ingredients information not available.
					</p>
				)}
			</CardContent>
		</Card>
	);
}
