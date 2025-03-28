import { isServer } from "@tanstack/react-query";

import OpenFoodFacts from "@/lib/off/src/main";

function makeOffClient() {
	// return new OpenFoodFacts(fetch, { country: "ca" });
	// ? Fot now because the walmart API is not available in Canada, we use OFF US as well
	return new OpenFoodFacts(fetch, { country: "us" });
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
