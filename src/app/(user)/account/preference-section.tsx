import { Activity, Leaf, ShieldCheck } from "lucide-react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// TODO probable should be stored as enum in the db and as type in the frontend
const importanceOptions = [
	{ value: "not-important", label: "Not important" },
	{ value: "important", label: "Important" },
	{ value: "very-important", label: "Very important" },
	{ value: "mandatory", label: "Mandatory" },
];

const PreferenceItem = ({
	title,
	description,
}: {
	title: string;
	description?: string;
}) => (
	<div className="mb-6 space-y-2">
		<div className="flex items-center justify-between">
			<h4 className="text-sm font-medium">{title}</h4>
		</div>
		<RadioGroup
			defaultValue="not-important"
			className="grid grid-cols-2 gap-2 pt-2">
			{importanceOptions.map((option) => (
				<div key={option.value} className="flex items-center space-x-2">
					<RadioGroupItem
						value={option.value}
						id={`${title.toLowerCase().replace(/\s+/g, "-")}-${option.value}`}
					/>
					<Label
						htmlFor={`${title.toLowerCase().replace(/\s+/g, "-")}-${option.value}`}
						className="text-xs">
						{option.label}
					</Label>
				</div>
			))}
		</RadioGroup>
		{description && (
			<p className="text-muted-foreground mt-1 text-xs">{description}</p>
		)}
	</div>
);

const PreferencesSection = () => {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Shopping & Food Preferences</h2>
				<Button>Save Preferences</Button>
			</div>

			<div className="bg-background rounded-lg border p-4">
				<div className="mb-6">
					<p className="text-muted-foreground mb-2 text-sm">
						Your preferences are kept in your browser and never sent to any
						third party.
					</p>
					<Button variant="outline" size="sm">
						Use Default Preferences
					</Button>
				</div>

				<Accordion
					type="multiple"
					defaultValue={["nutritional", "processing", "allergens"]}>
					<AccordionItem value="nutritional">
						<AccordionTrigger className="py-4">
							<div className="flex items-center">
								<div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-50">
									<Activity className="text-primary h-4 w-4" />
								</div>
								<span>Nutritional Quality</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pl-11">
							<PreferenceItem title="Good nutritional quality (Nutri-Score)" />
							<PreferenceItem title="Salt in low quantity" />
							<PreferenceItem title="Sugars in low quantity" />
							<PreferenceItem title="Fat in low quantity" />
							<PreferenceItem title="Saturated fat in low quantity" />
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="processing">
						<AccordionTrigger className="py-4">
							<div className="flex items-center">
								<div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-amber-50">
									<ShieldCheck className="h-4 w-4 text-amber-500" />
								</div>
								<span>Food Processing</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pl-11">
							<PreferenceItem title="No or little food processing (NOVA group)" />
							<PreferenceItem title="No or few additives" />
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="allergens">
						<AccordionTrigger className="py-4">
							<div className="flex items-center">
								<div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-50">
									<ShieldCheck className="h-4 w-4 text-red-500" />
								</div>
								<span>Allergens</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pl-11">
							<p className="text-muted-foreground mb-4 text-xs">
								There is always a possibility that data about allergens may be
								missing, incomplete, incorrect, or that the product&apos;s
								composition has changed. If you are allergic, always check the
								information on the actual product packaging.
							</p>
							<div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
								<div>
									<PreferenceItem title="Without Gluten" />
									<PreferenceItem title="Without Milk" />
									<PreferenceItem title="Without Eggs" />
									<PreferenceItem title="Without Nuts" />
									<PreferenceItem title="Without Peanuts" />
									<PreferenceItem title="Without Sesame seeds" />
									<PreferenceItem title="Without Soybeans" />
								</div>
								<div>
									<PreferenceItem title="Without Celery" />
									<PreferenceItem title="Without Mustard" />
									<PreferenceItem title="Without Lupin" />
									<PreferenceItem title="Without Fish" />
									<PreferenceItem title="Without Crustaceans" />
									<PreferenceItem title="Without Molluscs" />
									<PreferenceItem title="Without Sulphur dioxide and sulphites" />
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="ingredients">
						<AccordionTrigger className="py-4">
							<div className="flex items-center">
								<div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
									<Leaf className="h-4 w-4 text-blue-500" />
								</div>
								<span>Ingredients</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pl-11">
							<PreferenceItem title="Vegan" />
							<PreferenceItem title="Vegetarian" />
							<PreferenceItem title="Palm oil free" />
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="labels">
						<AccordionTrigger className="py-4">
							<div className="flex items-center">
								<div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-purple-50">
									<ShieldCheck className="h-4 w-4 text-purple-500" />
								</div>
								<span>Labels</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pl-11">
							<PreferenceItem
								title="Organic farming"
								description="Organic products promote ecological sustainability and biodiversity."
							/>
							<PreferenceItem
								title="Fair trade"
								description="Fair trade products help producers in developing countries."
							/>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="environment">
						<AccordionTrigger className="py-4">
							<div className="flex items-center">
								<div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-50">
									<Leaf className="h-4 w-4 text-green-500" />
								</div>
								<span>Environment</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pl-11">
							<PreferenceItem title="Low environmental impact (Green-Score)" />
							<PreferenceItem title="Low risk of deforestation (Forest footprint)" />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
};

export default PreferencesSection;
