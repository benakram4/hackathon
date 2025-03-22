import { atom } from "jotai";

// Type for OFF Knowledge Panel data
export interface OffKnowledgePanelData {
	product?: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		knowledge_panels?: Record<string, any>;
	};
	status?: number;
	status_verbose?: string;
}

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

// Utility to extract logo URLs from OFF data
export const extractOffLogos = (
	data: OffKnowledgePanelData | undefined,
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
	};

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
