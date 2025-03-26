import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type WalmartItem } from "@/types";

export function ProductHeader({ item }: { item: WalmartItem | undefined }) {
	const [quantity, setQuantity] = useState(1);

	return (
		<div className="flex flex-col">
			<div className="mb-2">
				<h1 className="mb-2 text-3xl font-bold">{item?.name}</h1>
				<div className="mb-4 flex items-center">
					<div className="mr-3 flex items-center">
						{/* Placeholder for ratings */}
					</div>
					<span className="text-muted-foreground">
						Brand: {item?.brandName || "Brand"}
					</span>
				</div>
				<div className="mb-4 text-2xl font-bold">
					${item?.salePrice?.toFixed(2) || "Price not available"}
				</div>
			</div>

			<ScrollArea className="mb-6 h-[23rem] pr-4">
				<p className="text-muted-foreground">{item?.shortDescription}</p>
			</ScrollArea>

			<div className="flex w-full items-center space-x-4">
				<Button className="w-full rounded-md px-4 py-2">Add to Cart</Button>
			</div>
		</div>
	);
}
