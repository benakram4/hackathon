import { Account, Client, Databases, OAuthProvider } from "appwrite";

const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID || "";
const client = new Client();
client
	.setEndpoint("https://cloud.appwrite.io/v1")
	.setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
// https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/${PROJECT_ID}

export const createGoogleSession = () => {
	return account.createOAuth2Session(
		OAuthProvider.Google, // provider
		`http://localhost:3000`, // redirect here on success
		"http://localhost:3000/auth/failure", // redirect here on failure
		["email"] // scopes (optional)
	);
};
