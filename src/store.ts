import { atom } from "jotai";

import { WalmartItem } from "./types";

export const shoppingCartAtom = atom<WalmartItem[]>([]);
