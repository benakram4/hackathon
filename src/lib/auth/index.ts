// For type definitions and convenience
import { type Models } from "node-appwrite";

// DO NOT include "use server" here

// Re-export the server actions
export * from "./actions";

// Add type for client-side imports
export type User = Models.User<Models.Preferences>;
