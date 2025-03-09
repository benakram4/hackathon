import { isServer } from "@tanstack/react-query";

import OpenFoodFacts from "@/lib/off/src/main";

function makeOffClient() {
	return new OpenFoodFacts(fetch, { country: "Canada" });
}

let browserOfflineClient: OpenFoodFacts | undefined = undefined;

export function getOffClient() {
	if (isServer) {
		return makeOffClient();
	} else {
		if (!browserOfflineClient) browserOfflineClient = makeOffClient();
		return browserOfflineClient;
	}
}
