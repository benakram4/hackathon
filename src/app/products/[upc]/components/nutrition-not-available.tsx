import { Info } from "lucide-react";

export function NutritionNotAvailable() {
	return (
		<div className="mt-12 rounded-lg border bg-gray-50 p-6 text-center">
			<Info className="text-muted-foreground mx-auto mb-2 h-6 w-6" />
			<h3 className="mb-1 font-medium">
				Nutrition data is not available for this product
			</h3>
			<p className="text-muted-foreground text-sm">
				We&apos;re working on collecting more information about this product.
			</p>
		</div>
	);
}
