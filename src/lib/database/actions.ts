"use server";

import { cookies } from "next/headers";

import { Query } from "node-appwrite";

import {
	type OrderSwapHistory,
	type UserImpact,
	type UserOrders,
} from "@/types/user";

import { createSessionClient } from "../server/appwrite";

export async function getImpactData(
	userId: string,
): Promise<UserImpact | null> {
	const sessionCookie = (await cookies()).get("session");

	try {
		const { databases } = await createSessionClient(sessionCookie?.value);
		const { documents: user_impact } = await databases.listDocuments(
			process.env.APPWRITE_DATABASE_ID as string,
			process.env.APPWRITE_USER_IMPACT_COLLECTION_ID as string,
			[Query.equal("user_id", userId)],
		);
		// this where everything needs to be calculated
		if (!user_impact.length) {
			return null;
		}
		if (!user_impact[0]) {
			throw new Error("User impact data is undefined");
		}

		const impactData: UserImpact = {
			$id: user_impact[0].$id,
			userId: user_impact[0].user_id as string,
			co2: user_impact[0].co2 as number,
			waste: user_impact[0].waste as number,
			water: user_impact[0].water as number,
		};

		return impactData;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function getOrderHistory(
	userId: string,
): Promise<UserOrders[] | null> {
	const sessionCookie = (await cookies()).get("session");

	try {
		const { databases } = await createSessionClient(sessionCookie?.value);
		const { documents: user_orders } = await databases.listDocuments(
			process.env.APPWRITE_DATABASE_ID as string,
			process.env.APPWRITE_USER_ORDERS_COLLECTION_ID as string,
			[Query.equal("userId", userId)],
		);

		if (!user_orders.length) {
			return null;
		}
		if (!user_orders[0]) {
			throw new Error("User order data is undefined");
		}

		// TODO: investigate why swap.orderId is undefined.
		// it's not even coming from the database even though appwrite console shows it.
		// most likely has something to do with the fact that the type of this specific attribute is a "relationship" in the appwrite console and not a "string"
		const orderHistory: UserOrders[] = user_orders.map((order) => ({
			$id: order.$id,
			$createdAt: order.$createdAt,
			userId: order.userId as string,
			items: order.items as number,
			swaps: (order.swapHistory as OrderSwapHistory[]).map((swap) => ({
				$id: swap.$id,
				$createdAt: swap.$createdAt,
				orderId: swap.orderId,
				originalProduct: swap.originalProduct,
				swappedProduct: swap.swappedProduct,
				co2: swap.co2,
				waste: swap.waste,
				water: swap.water,
			})),
			total: order.total as number,
			status: order.status as string,
			co2: order.co2 as number,
			waste: order.waste as number,
			water: order.water as number,
		}));

		return orderHistory;
	} catch (error) {
		console.error(error);
		return null;
	}
}
