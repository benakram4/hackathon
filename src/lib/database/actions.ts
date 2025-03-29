"use server";

import { cookies } from "next/headers";

import { ID, Query } from "node-appwrite";
import { v4 as uuidv4 } from "uuid";

import {
	type OrderSwapHistory,
	type UserAddress,
	type UserImpact,
	type UserOrders,
} from "@/types/database";

import { getUser } from "../auth";
import { createSessionClient } from "../server/appwrite";

export async function getUserAddress(
	userId: string,
): Promise<UserAddress | null> {
	const sessionCookie = (await cookies()).get("session");

	try {
		const { databases } = await createSessionClient(sessionCookie?.value);
		const { documents: userAddress } = await databases.listDocuments(
			process.env.APPWRITE_DATABASE_ID as string,
			process.env.APPWRITE_USER_ADDRESS_COLLECTION_ID as string,
			[Query.equal("userId", userId)],
		);

		if (!userAddress.length || !userAddress[0]) return null;

		const address: UserAddress = {
			$id: userAddress[0].$id,
			userId: userAddress[0].userId as string,
			type: userAddress[0].type as string,
			number: userAddress[0].number as number,
			line1: userAddress[0].line1 as string,
			line2: userAddress[0].line2 as string,
			city: userAddress[0].city as string,
			province: userAddress[0].province as string,
			postalCode: userAddress[0].postalCode as string,
			country: userAddress[0].country as string,
		};

		return address;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function updateUserAddress(
	userId: string,
	address: UserAddress,
): Promise<UserAddress | null> {
	const sessionCookie = (await cookies()).get("session");

	try {
		const { databases } = await createSessionClient(sessionCookie?.value);
		console.log("address", address);
		const { $id, ...addressData } = address;
		// if the address does not contain $id, it means it's a new address
		// TODO: Refactor this into a separate function and change the logic in address-section.tsx accordingly
		if (!$id) {
			const documentId = uuidv4().replace(/-/g, "").slice(0, 20);
			const { $id: createdDocumentId } = await databases.createDocument(
				process.env.APPWRITE_DATABASE_ID as string,
				process.env.APPWRITE_USER_ADDRESS_COLLECTION_ID as string,
				documentId,
				{ ...addressData },
			);

			const newAddress: UserAddress = {
				$id: createdDocumentId,
				...addressData,
			};

			return newAddress;
		}

		const { $id: documentId } = await databases.updateDocument(
			process.env.APPWRITE_DATABASE_ID as string,
			process.env.APPWRITE_USER_ADDRESS_COLLECTION_ID as string,
			$id,
			addressData,
		);

		const updatedAddress: UserAddress = {
			$id: documentId,
			...addressData,
		};

		return updatedAddress;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function getUserImpact(
	userId: string,
): Promise<UserImpact | null> {
	const sessionCookie = (await cookies()).get("session");

	try {
		const { databases } = await createSessionClient(sessionCookie?.value);
		const { documents: userImpact } = await databases.listDocuments(
			process.env.APPWRITE_DATABASE_ID as string,
			process.env.APPWRITE_USER_IMPACT_COLLECTION_ID as string,
			[Query.equal("userId", userId)],
		);
		// this where everything needs to be calculated
		if (!userImpact.length) {
			return null;
		}
		if (!userImpact[0]) {
			throw new Error("User impact data is undefined");
		}

		const impactData: UserImpact = {
			$id: userImpact[0].$id,
			userId: userImpact[0].user_id as string,
			co2: userImpact[0].co2 as number,
			waste: userImpact[0].waste as number,
			water: userImpact[0].water as number,
		};

		return impactData;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function updateUserImpact(
	newImpact: UserImpact,
): Promise<UserImpact | null> {
	const sessionCookie = (await cookies()).get("session");

	try {
		const { databases } = await createSessionClient(sessionCookie?.value);
		const { $id, ...impactData } = newImpact;
		const user = await getUser();
		if (!user) {
			throw new Error("User not found");
		}

		// get current user impact data
		const currentImpact = await getUserImpact(user.$id);
		if (!currentImpact) {
			throw new Error("User impact data not found");
		}

		// update the impact data with the new values
		impactData.co2 = Number(currentImpact.co2) + Number(newImpact.co2);
		impactData.waste = Number(currentImpact.waste) + Number(newImpact.waste);
		impactData.water = Number(currentImpact.water) + Number(newImpact.water);

		console.log("impactData", impactData);

		// update the user impact data in the database
		const { $id: documentId } = await databases.updateDocument(
			process.env.APPWRITE_DATABASE_ID as string,
			process.env.APPWRITE_USER_IMPACT_COLLECTION_ID as string,
			currentImpact.$id,
			{
				co2: impactData.co2 as unknown as number,
				waste: impactData.waste as unknown as number,
				water: impactData.water as unknown as number,
			},
		);

		const updatedImpact: UserImpact = {
			$id: documentId,
			userId: user.$id,
			co2: newImpact.co2,
			waste: newImpact.waste,
			water: newImpact.water,
		};

		return updatedImpact;
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
		const { documents: userOrders } = await databases.listDocuments(
			process.env.APPWRITE_DATABASE_ID as string,
			process.env.APPWRITE_USER_ORDERS_COLLECTION_ID as string,
			[Query.equal("userId", userId)],
		);

		if (!userOrders.length) {
			return null;
		}
		if (!userOrders[0]) {
			throw new Error("User order data is undefined");
		}

		// TODO: investigate why swap.orderId is undefined.
		// it's not even coming from the database even though appwrite console shows it.
		// most likely has something to do with the fact that the type of this specific attribute is a "relationship" in the appwrite database and not a "string"
		// orders correctly have the swap history when the data comes back but the orderId is undefined
		const orderHistory: UserOrders[] = userOrders.map((order) => ({
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

export async function createUserOrdersHistory(
	userOrder: UserOrders,
): Promise<UserOrders | null> {
	const sessionCookie = (await cookies()).get("session");

	try {
		const { databases } = await createSessionClient(sessionCookie?.value);
		const { $id, swaps, ...userOrderData } = userOrder;
		const user = await getUser();
		if (!user) {
			throw new Error("User not found");
		}
		const { $id: createdDocumentId, $createdAt: createdAt } =
			await databases.createDocument(
				process.env.APPWRITE_DATABASE_ID as string,
				process.env.APPWRITE_USER_ORDERS_COLLECTION_ID as string,
				ID.unique(),
				{
					...userOrderData,
					userId: user.$id,
					swapHistory: swaps.map((swap) => ({
						$id: swap.$id,
						$createdAt: swap.$createdAt,
						userOrders: {},
						originalProduct: swap.originalProduct,
						swappedProduct: swap.swappedProduct,
						co2: parseFloat(swap.co2 as unknown as string),
						waste: parseFloat(swap.waste as unknown as string),
						water: parseInt(swap.water as unknown as string),
					})),
				},
			);

		const newUserOrderHistory: UserOrders = {
			$id: createdDocumentId,
			$createdAt: createdAt,
			swaps: userOrder.swaps,
			userId: userOrder.userId,
			items: userOrder.items,
			total: userOrder.total,
			status: userOrder.status,
		};

		return newUserOrderHistory;
	} catch (error) {
		console.error(error);
		return null;
	}
}
