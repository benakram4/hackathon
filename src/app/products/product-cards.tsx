"use client";

import { useEffect, useMemo, useState } from "react";

import { useForm } from "@tanstack/react-form";
import { useQueries } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { defaultOffData, offDataMapAtom } from "@/atoms/off-data";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { searchSchema } from "@/lib/schemas/search-schema";
import {
	getAllCategoryIds,
	getWalmartItemsByCategory,
} from "@/lib/walmart/api";
import { getOffClient } from "@/providers/get-off-client";
import type { WalmartItem } from "@/types/walmart";

import ProductCard from "./product-card";

export default function ProductCards() {
	const [allProducts, setAllProducts] = useState<WalmartItem[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const itemsPerPage = 10;
	const categoryIds = getAllCategoryIds();
	const offClient = getOffClient();
	const setOffDataMap = useSetAtom(offDataMapAtom);
	const offDataMap = useAtomValue(offDataMapAtom);

	const form = useForm({
		defaultValues: {
			query: "",
		},
		onSubmit: ({ value }) => {
			console.log("Submitted search:", value.query);
			setSearchTerm(value.query.toLowerCase());
			setCurrentPage(1); // Reset to page 1 when searching
		},
	});

	const categoryQueries = useQueries({
		queries: categoryIds.map((categoryId) => ({
			queryKey: ["items", categoryId],
			queryFn: () => getWalmartItemsByCategory(categoryId),
			staleTime: 60 * 60 * 1000,
			gcacheTime: 60 * 60 * 1000,
		})),
	});

	useEffect(() => {
		const newProducts: WalmartItem[] = [];
		categoryQueries.forEach((query) => {
			if (query.data) {
				newProducts.push(...query.data);
			}
		});
		if (newProducts.length > 0) {
			setAllProducts((prev) => {
				const productMap = new Map<number, WalmartItem>();
				[...prev, ...newProducts].forEach((item) => {
					productMap.set(item.itemId, item);
				});
				return Array.from(productMap.values());
			});
		}
	}, [categoryQueries.map((q) => q.dataUpdatedAt).join(",")]);

	const filteredProducts = useMemo(() => {
		if (!searchTerm.trim()) return allProducts;

		return allProducts.filter((product) =>
			product.name?.toLowerCase().includes(searchTerm),
		);
	}, [allProducts, searchTerm]);

	const isLoading = categoryQueries.some((q) => q.isLoading && !q.data);
	const errors = categoryQueries.filter((q) => q.error).map((q) => q.error);

	const getCurrentPageItems = () => {
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
	};
	const currentPageItems = getCurrentPageItems();
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	const knowledgePanelQueries = useQueries({
		queries: currentPageItems.map((product) => ({
			queryKey: ["knowledgePanel", product.itemId],
			queryFn: async () => {
				try {
					if (!product.upc) return defaultOffData;
					if (offDataMap.has(product.upc)) return offDataMap.get(product.upc);
					const data = await offClient.getProductKnowledgePanels(product.upc);
					if (data && product.upc) {
						setOffDataMap((prev) => {
							const newMap = new Map(prev);
							newMap.set(product.upc, data);
							return newMap;
						});
					}
					return data || defaultOffData;
				} catch (error) {
					return defaultOffData;
				}
			},
			staleTime: 60 * 60 * 1000,
			gcacheTime: 60 * 60 * 1000,
			refetchOnWindowFocus: false,
			enabled: !!product.upc,
			retry: false,
		})),
	});

	const knowledgePanelMap = useMemo(() => {
		const map = new Map();
		knowledgePanelQueries.forEach((query, index) => {
			if (currentPageItems[index]) {
				map.set(currentPageItems[index].itemId, query.data || null);
			}
		});
		return map;
	}, [
		currentPageItems,
		knowledgePanelQueries.map((q) => q.dataUpdatedAt).join(","),
	]);

	const goToNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage((prev) => prev + 1);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const goToPreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const goToPage = (pageNumber: number) => {
		setCurrentPage(pageNumber);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const getPageButtons = () => {
		const buttons = [];
		const maxVisiblePages = 5;
		let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
		const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(1, endPage - maxVisiblePages + 1);
		}
		for (let i = startPage; i <= endPage; i++) {
			buttons.push(
				<Button
					key={i}
					variant={i === currentPage ? "secondary" : "outline"}
					className="h-8 w-8 p-0"
					onClick={() => goToPage(i)}>
					{i}
				</Button>,
			);
		}
		return buttons;
	};

	return (
		<div className="container mx-auto p-4">
			{isLoading && allProducts.length === 0 && (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{Array.from({ length: itemsPerPage }).map((_, i) => (
						<div
							key={i}
							className="group border-border bg-card overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg">
							<div className="bg-muted/50 relative h-64 w-full">
								<Skeleton className="h-full w-full" />
							</div>
							<div className="flex-grow p-5">
								<Skeleton className="h-6 w-1/2" />
								<Skeleton className="mt-2 h-4 w-3/4" />
								<Skeleton className="mt-2 h-4 w-full" />
							</div>
							<div className="border-t p-5">
								<Skeleton className="h-10 w-20" />
							</div>
						</div>
					))}
				</div>
			)}

			{errors.length > 0 && (
				<div className="text-destructive mb-4">
					{errors.map((error, i) => (
						<div key={i}>Error: {error?.message}</div>
					))}
				</div>
			)}

			{allProducts.length > 0 && (
				<>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							void form.handleSubmit();
						}}
						className="mb-4 w-full">
						<form.Field
							name="query"
							validators={{
								onSubmit: searchSchema,
							}}>
							{(field) => {
								const showError =
									field.state.meta.isTouched &&
									field.state.meta.errors.length > 0;

								return (
									<div className="flex w-full gap-2">
										{/* Input wrapper for positioning the clear button inside the input */}
										<div className="relative w-full">
											<input
												id="query"
												type="text"
												placeholder={
													showError
														? "Your search cannot be empty."
														: "Search products..."
												}
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												className={`h-10 w-full rounded-md border p-2 pr-10 ${
													showError
														? "border-red-500 placeholder-red-500"
														: "border-gray-300"
												}`}
											/>

											{/* Clear button positioned inside the input */}
											{field.state.value && (
												<button
													type="button"
													onClick={() => {
														field.handleChange("");
														setSearchTerm("");
														setCurrentPage(1);
													}}
													className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
													aria-label="Clear search">
													×
												</button>
											)}
										</div>

										{/* Submit button sits outside the input wrapper */}
										<Button
											type="submit"
											className={`h-10 flex-shrink-0 ${
												showError ? "bg-red-500 hover:bg-red-500" : ""
											}`}>
											Search
										</Button>
									</div>
								);
							}}
						</form.Field>
					</form>

					<div className="mb-2 text-lg font-semibold">
						{filteredProducts.length} products found
						{isLoading && " (loading more...)"}
						<span className="text-muted-foreground ml-2 text-sm font-normal">
							Showing page {currentPage} of {totalPages} (10 products per page)
						</span>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{currentPageItems.map((product: WalmartItem, index) => (
							<ProductCard
								key={product.itemId}
								product={product}
								knowledgePanelData={knowledgePanelMap.get(product.itemId)}
								isLoadingKnowledgePanel={
									knowledgePanelQueries[index]?.isLoading
								}
							/>
						))}
					</div>

					{totalPages > 1 && (
						<div className="mt-8 flex items-center justify-center gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={goToPreviousPage}
								disabled={currentPage === 1}>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							{getPageButtons()}
							<Button
								variant="outline"
								size="sm"
								onClick={goToNextPage}
								disabled={currentPage === totalPages}>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
