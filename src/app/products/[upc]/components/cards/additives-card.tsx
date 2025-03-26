/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function AdditivesCard({ nutritionData }: { nutritionData: any }) {
	return (
		<Card>
			<CardContent className="pt-6">
				<h3 className="mb-4 text-lg font-semibold">Additives Information</h3>
				{nutritionData.additives.length > 0 ? (
					<div className="flex flex-wrap gap-2">
						{nutritionData.additives.map((additive: any) => (
							<Badge key={additive.id} variant="outline">
								{additive.id} - {additive.name}
							</Badge>
						))}
					</div>
				) : (
					<div className="text-muted-foreground text-sm">
						<p>No additives reported for this product.</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
