import { atomWithStorage } from "jotai/utils";

import type { WalmartItem } from "@/types/walmart";

export interface FavoriteProduct {
	walmart: WalmartItem;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	off: any; // TODO Adjust the type according to your OFF data structure
}

export const favProductsAtom = atomWithStorage<FavoriteProduct[]>(
	"favProducts",
	[],
);
