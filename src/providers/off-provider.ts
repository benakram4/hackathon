"use client";

import { atom, useAtomValue } from "jotai";

import OpenFoodFacts from "@/lib/off/src/main";
import { getOffClient } from "@/providers/get-off-client";

// Create an atom to store the OFF client instance
const offClientAtom = atom<OpenFoodFacts>(getOffClient());

// TODO - see why we even need this
// Provider component - simplified to just return children
export function OFFProvider({ children }: { children: React.ReactNode }) {
	return children;
}

// Hook to access the OFF client - now with getOffClient() fallback
export function useOFF(): OpenFoodFacts {
	// Try to get the client from the atom first
	const client = useAtomValue(offClientAtom);

	// If somehow we don't have a client, get it directly
	// (This shouldn't happen since we initialize the atom with getOffClient)
	return client || getOffClient();
}
