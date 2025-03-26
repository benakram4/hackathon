/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";

export function NovaGroupCard({ nutritionData }: { nutritionData: any }) {
	const getNovaDescription = (group?: number) => {
		if (!group) return "";

		const descriptions: Record<number, string> = {
			1: "Unprocessed or minimally processed foods",
			2: "Processed culinary ingredients",
			3: "Processed foods",
			4: "Ultra-processed foods",
		};
		return descriptions[group] || "";
	};

	return (
		<Card>
			<CardContent className="pt-6">
				<h3 className="mb-4 text-lg font-semibold">
					{nutritionData.novaGroup.title ||
						"NOVA Food Processing Classification"}
					{nutritionData.novaGroup.group && ` ${nutritionData.novaGroup.group}`}
				</h3>
				<div className="mb-4 flex">
					{[1, 2, 3, 4].map((group) => (
						<div
							key={group}
							className={`flex h-10 flex-1 items-center justify-center ${
								group === nutritionData.novaGroup.group
									? "bg-primary font-bold text-white"
									: "bg-gray-100"
							}`}>
							{group}
						</div>
					))}
				</div>
				<div className="text-muted-foreground text-sm">
					<p>
						{nutritionData.novaGroup.subtitle ||
							getNovaDescription(nutritionData.novaGroup.group)}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
