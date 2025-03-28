"use client";

import { useEffect, useState } from "react";

import { useAtom } from "jotai";
import { Activity, Leaf, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import {
	RESET,
	type ShopPreferences,
	shopPreferencesAtom,
} from "@/atoms/shop-preference";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const importanceOptions = [
	{ value: "not-important", label: "Not important" },
	{ value: "important", label: "Important" },
	{ value: "very-important", label: "Very important" },
	{ value: "mandatory", label: "Mandatory" },
];

const PreferenceItem = ({
	title,
	category,
	value,
	onChange,
	description,
}: {
	title: string;
	category: keyof ShopPreferences;
	value?: string;
	onChange: (
		category: keyof ShopPreferences,
		key: string,
		value: string,
	) => void;
	description?: string;
}) => (
	<div className="mb-6 space-y-2">
		<div className="flex items-center justify-between">
			<h4 className="text-sm font-medium">{title}</h4>
		</div>
		<RadioGroup
			value={value || "not-important"}
			onValueChange={(newValue) => onChange(category, title, newValue)}
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
	const [preferences, setPreferences] = useAtom(shopPreferencesAtom);
	const [hasChanges, setHasChanges] = useState(false);

	useEffect(() => {
		toast.info(
			"Work in progress! Saving your preferences will impact the swap algorithm and search sorting in the future.",
		);
	}, []);

	const handlePreferenceChange = (
		category: keyof ShopPreferences,
		key: string,
		value: string,
	) => {
		setPreferences((prev) => ({
			...prev,
			[category]: {
				...prev[category],
				[key]: value,
			},
		}));
		setHasChanges(true);
	};

	const handleSavePreferences = () => {
		toast.success("Preferences saved successfully!");
		setHasChanges(false);
	};

	const handleResetPreferences = () => {
		setPreferences(RESET);
		toast.info("Preferences have been reset to defaults");
		setHasChanges(false);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Shopping & Food Preferences</h2>
				<Button onClick={handleSavePreferences} disabled={!hasChanges}>
					{hasChanges ? "Save Changes" : "Saved"}
				</Button>
			</div>

			<Alert variant="default" className="mb-4">
				<AlertTitle>Work in Progress</AlertTitle>
				<AlertDescription>
					This feature is still under development. Your preferences will impact
					product recommendations and search results in future updates.
				</AlertDescription>
			</Alert>

			<div className="bg-background rounded-lg border p-4">
				<div className="mb-6">
					<p className="text-muted-foreground mb-2 text-sm">
						Your preferences are kept in your browser and never sent to any
						third party.
					</p>
					<Button variant="outline" size="sm" onClick={handleResetPreferences}>
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
							<PreferenceItem
								title="Good nutritional quality (Nutri-Score)"
								category="nutritional"
								value={
									preferences.nutritional[
										"Good nutritional quality (Nutri-Score)"
									]
								}
								onChange={handlePreferenceChange}
							/>
							<PreferenceItem
								title="Salt in low quantity"
								category="nutritional"
								value={preferences.nutritional["Salt in low quantity"]}
								onChange={handlePreferenceChange}
							/>
							<PreferenceItem
								title="Sugars in low quantity"
								category="nutritional"
								value={preferences.nutritional["Sugars in low quantity"]}
								onChange={handlePreferenceChange}
							/>
							<PreferenceItem
								title="Fat in low quantity"
								category="nutritional"
								value={preferences.nutritional["Fat in low quantity"]}
								onChange={handlePreferenceChange}
							/>
							<PreferenceItem
								title="Saturated fat in low quantity"
								category="nutritional"
								value={preferences.nutritional["Saturated fat in low quantity"]}
								onChange={handlePreferenceChange}
							/>
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
							<PreferenceItem
								title="No or little food processing (NOVA group)"
								category="processing"
								value={
									preferences.processing[
										"No or little food processing (NOVA group)"
									]
								}
								onChange={handlePreferenceChange}
							/>
							<PreferenceItem
								title="No or few additives"
								category="processing"
								value={preferences.processing["No or few additives"]}
								onChange={handlePreferenceChange}
							/>
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
									<PreferenceItem
										title="Without Gluten"
										category="allergens"
										value={preferences.allergens["Without Gluten"]}
										onChange={handlePreferenceChange}
									/>
									<PreferenceItem
										title="Without Milk"
										category="allergens"
										value={preferences.allergens["Without Milk"]}
										onChange={handlePreferenceChange}
									/>
									<PreferenceItem
										title="Without Eggs"
										category="allergens"
										value={preferences.allergens["Without Eggs"]}
										onChange={handlePreferenceChange}
									/>
									<PreferenceItem
										title="Without Nuts"
										category="allergens"
										value={preferences.allergens["Without Nuts"]}
										onChange={handlePreferenceChange}
									/>
									<PreferenceItem
										title="Without Peanuts"
										category="allergens"
										value={preferences.allergens["Without Peanuts"]}
										onChange={handlePreferenceChange}
									/>
									<PreferenceItem
										title="Without Sesame seeds"
										category="allergens"
										value={preferences.allergens["Without Sesame seeds"]}
										onChange={handlePreferenceChange}
									/>
									<PreferenceItem
										title="Without Soybeans"
										category="allergens"
										value={preferences.allergens["Without Soybeans"]}
										onChange={handlePreferenceChange}
									/>
								</div>
								<div>
									<PreferenceItem
										title="Without Celery"
										category="allergens"
										value={preferences.allergens["Without Celery"]}
										onChange={handlePreferenceChange}
									/>
									<PreferenceItem
										title="Without Mustard"
										category="allergens"
										value={preferences.allergens["Without Mustard"]}
										onChange={handlePreferenceChange}
									/>
									<PreferenceItem
										title="Without Lupin"
										category="allergens"
										value={preferences.allergens["Without Lupin"]}
										onChange={handlePreferenceChange}
									/>
									<PreferenceItem
										title="Without Fish"
										category="allergens"
										value={preferences.allergens["Without Fish"]}
										onChange={handlePreferenceChange}
									/>
									<PreferenceItem
										title="Without Crustaceans"
										category="allergens"
										value={preferences.allergens["Without Crustaceans"]}
										onChange={handlePreferenceChange}
									/>
									<PreferenceItem
										title="Without Molluscs"
										category="allergens"
										value={preferences.allergens["Without Molluscs"]}
										onChange={handlePreferenceChange}
									/>
									<PreferenceItem
										title="Without Sulphur dioxide and sulphites"
										category="allergens"
										value={
											preferences.allergens[
												"Without Sulphur dioxide and sulphites"
											]
										}
										onChange={handlePreferenceChange}
									/>
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
							<PreferenceItem
								title="Vegan"
								category="ingredients"
								value={preferences.ingredients["Vegan"]}
								onChange={handlePreferenceChange}
							/>
							<PreferenceItem
								title="Vegetarian"
								category="ingredients"
								value={preferences.ingredients["Vegetarian"]}
								onChange={handlePreferenceChange}
							/>
							<PreferenceItem
								title="Palm oil free"
								category="ingredients"
								value={preferences.ingredients["Palm oil free"]}
								onChange={handlePreferenceChange}
							/>
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
								category="labels"
								value={preferences.labels["Organic farming"]}
								onChange={handlePreferenceChange}
								description="Organic products promote ecological sustainability and biodiversity."
							/>
							<PreferenceItem
								title="Fair trade"
								category="labels"
								value={preferences.labels["Fair trade"]}
								onChange={handlePreferenceChange}
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
							<PreferenceItem
								title="Low environmental impact (Green-Score)"
								category="environment"
								value={
									preferences.environment[
										"Low environmental impact (Green-Score)"
									]
								}
								onChange={handlePreferenceChange}
							/>
							<PreferenceItem
								title="Low risk of deforestation (Forest footprint)"
								category="environment"
								value={
									preferences.environment[
										"Low risk of deforestation (Forest footprint)"
									]
								}
								onChange={handlePreferenceChange}
							/>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
};

export default PreferencesSection;
