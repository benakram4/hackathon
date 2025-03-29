"use client";

import { useAtom, useAtomValue } from "jotai";

import ProductCard from "@/app/products/product-card";
import { favProductsAtom } from "@/atoms/fav-product";
import { offDataMapAtom } from "@/atoms/off-data";

const FavoriteItems = () => {
	const [favorites] = useAtom(favProductsAtom);
	const offDataMap = useAtomValue(offDataMapAtom);

	return (
		<div className="p-4">
			<h2 className="mb-4 text-2xl font-bold">Favorite Items</h2>
			{favorites.length === 0 ? (
				<p>No favorite items yet.</p>
			) : (
				<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{favorites.map((fav, index) => {
						// Get knowledge panel data from offDataMap if it exists
						const knowledgePanelData = fav.walmart.upc
							? offDataMap.get(fav.walmart.upc)
							: undefined;

						return (
							<ProductCard
								key={index}
								product={fav.walmart}
								knowledgePanelData={knowledgePanelData}
								isLoadingKnowledgePanel={false} // Data already loaded if present
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default FavoriteItems;
