/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { atom } from "jotai";

// Type for OFF Knowledge Panel data
export interface OffKnowledgePanelData {
	product?: {
		knowledge_panels?: Record<string, any>;
	};
	status?: number;
	status_verbose?: string;
}

// Default empty OFF data structure
export const defaultOffData: OffKnowledgePanelData = {
	product: { knowledge_panels: {} },
	status: 0,
	status_verbose: "No data available",
};

// Main atom to store all OFF data
export const offDataMapAtom = atom<Map<string, OffKnowledgePanelData>>(
	new Map(),
);

// Helper function to get a product's OFF data by UPC
export const getOffDataByUpc = (
	dataMap: Map<string, OffKnowledgePanelData>,
	upc: string | null,
): OffKnowledgePanelData | null => {
	if (!upc) return null;
	return dataMap.get(upc) || null;
};

export const extractOffLogos = (
	data: OffKnowledgePanelData | undefined | null,
): {
	nutriScoreLogo: string;
	greenScoreLogo: string;
	novaGroupLogo: string;
} => {
	const defaultLogos = {
		nutriScoreLogo:
			"https://static.openfoodfacts.org/images/attributes/dist/nutriscore-unknown-new-en.svg",
		greenScoreLogo:
			"https://static.openfoodfacts.org/images/attributes/dist/green-score-unknown.svg",
		novaGroupLogo:
			"https://static.openfoodfacts.org/images/attributes/dist/nova-group-unknown.svg",
	} as const;

	if (!data?.product?.knowledge_panels) {
		return defaultLogos;
	}

	const panels = data.product.knowledge_panels;

	return {
		nutriScoreLogo:
			panels.nutriscore_2023?.title_element?.icon_url ??
			defaultLogos.nutriScoreLogo,
		greenScoreLogo:
			panels.environmental_score?.title_element?.icon_url ??
			defaultLogos.greenScoreLogo,
		novaGroupLogo:
			panels.nova?.title_element?.icon_url ?? defaultLogos.novaGroupLogo,
	};
};

// Interface for structured nutrition and sustainability data
export interface NutritionAndSustainabilityData {
	nutriScore: {
		grade?: string;
		score?: number;
		title?: string;
		subtitle?: string;
	};
	novaGroup: {
		group?: number;
		title?: string;
		subtitle?: string;
		description?: string;
	};
	nutrientLevels: {
		fat?: { level: string; value?: number };
		saturatedFat?: { level: string; value?: number };
		sugars?: { level: string; value?: number };
		salt?: { level: string; value?: number };
	};
	additives: Array<{ id: string; name: string }>;
	servingSize?: string;
	environmentalScore: {
		grade?: string;
		title?: string;
		subtitle?: string;
	};
	packaging: {
		materials?: string[];
		recyclability?: string;
	};
	ingredients: {
		count?: number;
		list?: string;
		analysis?: {
			palmOil?: boolean;
		};
	};
	hasNutritionData: boolean;
}

// Extract nutrition and sustainability data from OFF knowledge panels
export const extractNutritionAndSustainabilityData = (
	data: OffKnowledgePanelData | undefined | null,
): NutritionAndSustainabilityData => {
	// Default data structure with undefined values
	const defaultData: NutritionAndSustainabilityData = {
		nutriScore: {},
		novaGroup: {},
		nutrientLevels: {},
		additives: [],
		environmentalScore: {},
		packaging: {},
		ingredients: {},
		hasNutritionData: false,
	};

	// If no data available, return default structure
	if (!data?.product?.knowledge_panels) {
		return defaultData;
	}

	const panels = data.product.knowledge_panels;
	const result = { ...defaultData };

	// Check if we have nutrition data
	result.hasNutritionData =
		!!panels.nutriscore_2023 || !!panels.nutrient_levels;

	// Extract Nutri-Score data
	if (panels.nutriscore_2023) {
		const nutriscorePanel = panels.nutriscore_2023;
		result.nutriScore = {
			grade: nutriscorePanel.title_element?.grade || undefined,
			title: nutriscorePanel.title_element?.title || undefined,
			subtitle: nutriscorePanel.title_element?.subtitle || undefined,
		};
	}

	// Extract NOVA group data
	if (panels.nova) {
		const novaPanel = panels.nova;
		// Try to extract the NOVA group number from the title (e.g., "Ultra-processed foods")
		const novaGroupMatch = novaPanel.title_element?.title?.match(/Group (\d)/i);
		const group = novaGroupMatch
			? parseInt(novaGroupMatch[1])
			: novaPanel.title_element?.title?.includes("Ultra-processed")
				? 4
				: novaPanel.title_element?.title?.includes("Processed foods")
					? 3
					: novaPanel.title_element?.title?.includes("Processed culinary")
						? 2
						: novaPanel.title_element?.title?.includes("Unprocessed")
							? 1
							: undefined;

		result.novaGroup = {
			group,
			title: novaPanel.title_element?.title || undefined,
			subtitle: novaPanel.title_element?.subtitle || undefined,
		};
	}

	// Extract nutrient levels
	if (panels.nutrient_levels && panels.nutrient_level_fat) {
		result.nutrientLevels = {
			fat: {
				level: extractNutrientLevel(panels.nutrient_level_fat),
				value: extractNutrientValue(panels.nutrient_level_fat),
			},
			saturatedFat: {
				level: extractNutrientLevel(panels.nutrient_level_saturated_fat),
				value: extractNutrientValue(panels.nutrient_level_saturated_fat),
			},
			sugars: {
				level: extractNutrientLevel(panels.nutrient_level_sugars),
				value: extractNutrientValue(panels.nutrient_level_sugars),
			},
			salt: {
				level: extractNutrientLevel(panels.nutrient_level_salt),
				value: extractNutrientValue(panels.nutrient_level_salt),
			},
		};
	}

	// Extract additives
	if (panels.additives && panels.additives.elements) {
		const additivePanels = panels.additives.elements
			.filter((element: any) =>
				element.panel_element?.panel_id?.startsWith("additive_"),
			)

			.map((element: any) => element.panel_element?.panel_id);

		result.additives = [];
		additivePanels.forEach((panelId: string) => {
			if (panels[panelId] && panels[panelId].title_element?.title) {
				const additiveName = panels[panelId].title_element.title;
				// Extract the E-number if available (e.g., "E150d - Sulphite ammonia caramel")
				const match = additiveName.match(/^(E\d+[a-z]?) - (.+)$/i);
				if (match) {
					result.additives.push({
						id: match[1],
						name: match[2],
					});
				} else {
					// If no E-number format, just use the whole name
					result.additives.push({
						id: panelId.replace("additive_en:", ""),
						name: additiveName,
					});
				}
			}
		});
	}

	// Extract serving size
	if (
		panels.serving_size &&
		panels.serving_size.elements &&
		panels.serving_size.elements.length > 0
	) {
		const servingSizeElement = panels.serving_size.elements[0];
		if (servingSizeElement.text_element?.html) {
			const match =
				servingSizeElement.text_element.html.match(/(\d+\s*[a-z]+)/i);
			if (match) {
				result.servingSize = match[1];
			}
		}
	}

	// Extract Environmental Score
	if (panels.environmental_score) {
		const envScorePanel = panels.environmental_score;
		result.environmentalScore = {
			grade: envScorePanel.title_element?.grade || undefined,
			title: envScorePanel.title_element?.title || undefined,
			subtitle: envScorePanel.title_element?.subtitle || undefined,
		};
	}

	// Extract packaging information
	if (panels.packaging_recycling) {
		const packagingMaterials: string[] = [];

		// Try to extract materials from packaging_materials panel
		if (
			panels.packaging_materials &&
			panels.packaging_materials.elements &&
			panels.packaging_materials.elements[0]?.table_element?.rows
		) {
			panels.packaging_materials.elements[0].table_element.rows.forEach(
				(row: any) => {
					if (row.values && row.values[0] && row.values[0].text) {
						packagingMaterials.push(row.values[0].text);
					}
				},
			);
		}

		result.packaging = {
			materials: packagingMaterials.length > 0 ? packagingMaterials : undefined,
			recyclability:
				panels.packaging_recycling.title_element?.title || undefined,
		};
	}

	// Extract ingredients information
	if (panels.ingredients) {
		const ingredientsPanel = panels.ingredients;

		// Try to extract ingredient count
		let count: number | undefined = undefined;
		if (ingredientsPanel.title_element?.title) {
			const countMatch =
				ingredientsPanel.title_element.title.match(/(\d+)\s+ingredients/i);
			if (countMatch) {
				count = parseInt(countMatch[1]);
			}
		}

		// Get ingredients list text
		let list: string | undefined = undefined;
		if (ingredientsPanel.elements && ingredientsPanel.elements.length > 0) {
			const textElement = ingredientsPanel.elements.find(
				(el: any) => el.element_type === "text" && el.text_element?.html,
			);

			if (textElement) {
				list = textElement.text_element.html;
			}
		}

		// Only keep palm oil analysis
		const palmOil =
			panels.ingredients_analysis_en?.["palm-oil-content-unknown"]
				?.evaluation !== "good";

		result.ingredients = {
			count,
			list,
			analysis: {
				palmOil,
			},
		};
	}

	return result;
};

// Helper function to extract nutrient level (low, moderate, high)

const extractNutrientLevel = (nutrientPanel: any): string => {
	if (!nutrientPanel || !nutrientPanel.title_element) return "unknown";

	// Try to extract from title (e.g., "Fat in low quantity (0%)")
	const titleMatch = nutrientPanel.title_element.title?.match(
		/in\s+(low|moderate|high)\s+quantity/i,
	);
	if (titleMatch) return titleMatch[1].toLowerCase();

	// Look for the icon URL which often contains the level
	if (nutrientPanel.title_element.icon_url) {
		if (nutrientPanel.title_element.icon_url.includes("low.svg")) return "low";
		if (nutrientPanel.title_element.icon_url.includes("moderate.svg"))
			return "moderate";
		if (nutrientPanel.title_element.icon_url.includes("high.svg"))
			return "high";
	}

	return "unknown";
};

// Helper function to extract nutrient value as percentage

const extractNutrientValue = (nutrientPanel: any): number | undefined => {
	if (!nutrientPanel || !nutrientPanel.title_element) return undefined;

	// Try to extract percentage from title (e.g., "Fat in low quantity (0%)")
	const percentMatch =
		nutrientPanel.title_element.title?.match(/\((\d+(\.\d+)?)%\)/);
	if (percentMatch) return parseFloat(percentMatch[1]);

	// Try to extract directly from value if present
	if (typeof nutrientPanel.title_element.value === "number") {
		return nutrientPanel.title_element.value;
	}

	return undefined;
};
