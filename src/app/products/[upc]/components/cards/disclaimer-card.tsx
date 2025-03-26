import { Info } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function DisclaimerCard() {
	return (
		<Card className="md:col-span-2">
			<CardContent className="pt-6">
				<div className="flex items-start">
					<Info className="text-muted-foreground mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
					<p className="text-muted-foreground text-sm">
						The information shown is based on our database and may not be
						complete or accurate. Always check the product label for the most
						up-to-date information. If you find an error, please help us improve
						by reporting it.
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
