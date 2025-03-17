import crypto from "crypto";

interface WalmartHeaders {
	"WM_CONSUMER.ID": string;
	"WM_CONSUMER.INTIMESTAMP": string;
	"WM_SEC.KEY_VERSION": string;
	"WM_SEC.AUTH_SIGNATURE": string;
	[key: string]: string;
}

/**
 * Canonicalizes headers by sorting them and creating a string with values separated by newlines
 * @param headers Headers to canonicalize
 * @returns Array with parameter names string and canonicalized string
 */
function canonicalize(
	headers: Omit<WalmartHeaders, "WM_SEC.AUTH_SIGNATURE">,
): [string, string] {
	const sortedKeys = Object.keys(headers).sort();

	let parameterNames = "";
	let canonicalizedStr = "";

	for (const key of sortedKeys) {
		const val = headers[key as keyof typeof headers] as string;
		parameterNames += `${key.trim()};`;
		canonicalizedStr += `${val.toString().trim()}\n`;
	}

	return [parameterNames, canonicalizedStr];
}

/**
 * Generates a signature for Walmart API authentication
 * @param privateKeyPem Private key in PEM format
 * @param stringToSign String to sign
 * @returns Base64 encoded signature
 */
function generateSignature(
	privateKeyPem: string,
	stringToSign: string,
): string {
	const sign = crypto.createSign("SHA256");
	sign.update(stringToSign);

	try {
		const signature = sign.sign(privateKeyPem, "base64");
		return signature;
	} catch (err) {
		console.error("Signing error:", err);
		throw err;
	}
}

/**
 * Generates Walmart API authentication headers
 * @param consumerId Walmart API consumer ID
 * @param privateKeyVersion Private key version
 * @param privateKeyPem Private key in PEM format
 * @returns Headers for Walmart API authentication
 */
export function generateWalmartHeaders(
	consumerId: string,
	privateKeyVersion: string,
	privateKeyPem: string,
): WalmartHeaders {
	const timestamp = Date.now().toString();

	const headers: Omit<WalmartHeaders, "WM_SEC.AUTH_SIGNATURE"> = {
		"WM_CONSUMER.ID": consumerId,
		"WM_CONSUMER.INTIMESTAMP": timestamp,
		"WM_SEC.KEY_VERSION": privateKeyVersion,
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, stringToSign] = canonicalize(headers);
	const signature = generateSignature(privateKeyPem, stringToSign);

	return {
		"WM_CONSUMER.ID": consumerId,
		"WM_CONSUMER.INTIMESTAMP": timestamp,
		"WM_SEC.KEY_VERSION": privateKeyVersion,
		"WM_SEC.AUTH_SIGNATURE": signature,
	};
}
