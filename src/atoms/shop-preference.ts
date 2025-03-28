import { RESET, atomWithStorage, createJSONStorage } from "jotai/utils";

// Define the structure of our preferences
export interface ShopPreferences {
	nutritional: Record<string, string>;
	processing: Record<string, string>;
	allergens: Record<string, string>;
	ingredients: Record<string, string>;
	labels: Record<string, string>;
	environment: Record<string, string>;
}

// Create a validator function to ensure the data structure is correct
const isValidShopPreferences = (value: unknown): value is ShopPreferences => {
	if (typeof value !== "object" || value === null) return false;

	const expectedKeys = [
		"nutritional",
		"processing",
		"allergens",
		"ingredients",
		"labels",
		"environment",
	];

	return expectedKeys.every(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(key) => key in value && typeof (value as any)[key] === "object",
	);
};

// Default preferences
const defaultPreferences: ShopPreferences = {
	nutritional: {},
	processing: {},
	allergens: {},
	ingredients: {},
	labels: {},
	environment: {},
};

// Create a custom JSON storage with validation
const storage = createJSONStorage<ShopPreferences>(() => localStorage);

// Create the atom with storage
export const shopPreferencesAtom = atomWithStorage<ShopPreferences>(
	"shopPreferences",
	defaultPreferences,
	{
		...storage,
		getItem: (key, initialValue) => {
			try {
				const item = localStorage.getItem(key);
				if (!item) return initialValue;

				const parsedValue = JSON.parse(item);
				return isValidShopPreferences(parsedValue) ? parsedValue : initialValue;
			} catch (e) {
				console.error("Error retrieving preferences from storage:", e);
				return initialValue;
			}
		},
	},
	{ getOnInit: true }, // Important: Get from storage on initialization
);

// Export the reset symbol to allow clearing the storage
export { RESET };
