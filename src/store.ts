import { atom } from "jotai";

import { type WalmartItem } from "./types";

export const shoppingCartAtom = atom<WalmartItem[]>([]);
