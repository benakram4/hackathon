"use client";

import { useAtom } from "jotai";

import ProductCard from "@/app/products/product-card";
import { favProductsAtom } from "@/atoms/fav-product";

const FavoriteItems = () => {
	const [favorites] = useAtom(favProductsAtom);

	return (
		<div className="p-4">
			<h2 className="mb-4 text-2xl font-bold">Favorite Items</h2>
			{favorites.length === 0 ? (
				<p>No favorite items yet.</p>
			) : (
				<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{favorites.map((fav, index) => (
						// Using Walmart data for display; adjust as needed if combining OFF data.
						<ProductCard key={index} product={fav.walmart} />
					))}
				</div>
			)}
		</div>
	);
};

export default FavoriteItems;
