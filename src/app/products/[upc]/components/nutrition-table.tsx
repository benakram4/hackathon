import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function NutritionTable({ combinedOffData }: { combinedOffData: any }) {
	return (
		<div className="mt-8">
			<h3 className="mb-4 text-lg font-semibold">Nutritional Facts</h3>
			<Card>
				<CardContent>
					<Table>
						<TableCaption>
							Nutritional information per 100g / serving.
						</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[200px]">Nutrient</TableHead>
								<TableHead>Per 100g</TableHead>
								<TableHead>Per Serving</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell className="font-medium">Energy</TableCell>
								<TableCell>
									{(
										combinedOffData?.product?.knowledge_panels
											?.nutrition_facts_table?.elements[0]?.table_element
											?.rows[0]?.values[1]?.text as string
									)
										?.split(/<br>|<br\/>|<br \/>/i)
										.map((text, index) => <div key={index}>{text}</div>) ||
										"N/A"}
								</TableCell>
								<TableCell>
									{(
										combinedOffData?.product?.knowledge_panels
											?.nutrition_facts_table?.elements[0]?.table_element
											?.rows[0]?.values[2]?.text as string
									)?.split("<br>") || "N/A"}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">Fat</TableCell>
								<TableCell>
									{combinedOffData?.product?.knowledge_panels
										?.nutrition_facts_table?.elements[0]?.table_element?.rows[1]
										?.values[1]?.text || "N/A"}
								</TableCell>
								<TableCell>
									{combinedOffData?.product?.knowledge_panels
										?.nutrition_facts_table?.elements[0]?.table_element?.rows[1]
										?.values[2]?.text || "N/A"}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">Salt</TableCell>
								<TableCell>
									{combinedOffData?.product?.knowledge_panels
										?.nutrition_facts_table?.elements[0]?.table_element?.rows[2]
										?.values[1]?.text || "N/A"}
								</TableCell>
								<TableCell>
									{combinedOffData?.product?.knowledge_panels
										?.nutrition_facts_table?.elements[0]?.table_element?.rows[2]
										?.values[2]?.text || "N/A"}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">Carbohydrates</TableCell>
								<TableCell>
									{combinedOffData?.product?.knowledge_panels
										?.nutrition_facts_table?.elements[0]?.table_element?.rows[3]
										?.values[1]?.text || "N/A"}
								</TableCell>
								<TableCell>
									{combinedOffData?.product?.knowledge_panels
										?.nutrition_facts_table?.elements[0]?.table_element?.rows[3]
										?.values[2]?.text || "N/A"}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">Proteins</TableCell>
								<TableCell>
									{combinedOffData?.product?.knowledge_panels
										?.nutrition_facts_table?.elements[0]?.table_element?.rows[4]
										?.values[1]?.text || "N/A"}
								</TableCell>
								<TableCell>
									{combinedOffData?.product?.knowledge_panels
										?.nutrition_facts_table?.elements[0]?.table_element?.rows[4]
										?.values[2]?.text || "N/A"}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
