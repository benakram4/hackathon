"use client";

import { useEffect, useState } from "react";

import { useQueries } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	getAllCategoryIds,
	getWalmartItemsByCategory,
} from "@/lib/walmart/api";
import { getOffClient } from "@/providers/get-off-client";
import { type WalmartItem } from "@/types/walmart";

import ProductCard from "./product-card";

export default function ProductCards() {
	const [allProducts, setAllProducts] = useState<WalmartItem[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const categoryIds = getAllCategoryIds();
	const offClient = getOffClient();

	const categoryQueries = useQueries({
		queries: categoryIds.map((categoryId) => ({
			queryKey: ["items", categoryId],
			queryFn: () => getWalmartItemsByCategory(categoryId),
			staleTime: 60 * 60 * 1000, // 1 hour
			gcacheTime: 60 * 60 * 1000, // 1 hour
		})),
	});

	// Update products as each category query resolves
	useEffect(() => {
		const newProducts: WalmartItem[] = [];

		categoryQueries.forEach((query) => {
			if (query.data) {
				newProducts.push(...query.data);
			}
		});

		if (newProducts.length > 0) {
			setAllProducts((prev) => {
				// Deduplicate by itemId
				const productMap = new Map<number, WalmartItem>();
				[...prev, ...newProducts].forEach((item) => {
					productMap.set(item.itemId, item);
				});
				return Array.from(productMap.values());
			});
		}
	}, [categoryQueries.map((q) => q.dataUpdatedAt).join(",")]);

	const isLoading = categoryQueries.some((q) => q.isLoading && !q.data);
	const errors = categoryQueries.filter((q) => q.error).map((q) => q.error);

	// Get current page items
	const getCurrentPageItems = () => {
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		return allProducts.slice(indexOfFirstItem, indexOfLastItem);
	};

	const currentPageItems = getCurrentPageItems();
	const totalPages = Math.ceil(allProducts.length / itemsPerPage);

	// Fetch knowledge panel data only for visible products
	const knowledgePanelQueries = useQueries({
		queries: currentPageItems.map((product) => ({
			queryKey: ["knowledgePanel", product.itemId],
			queryFn: async () => {
				try {
					if (!product.upc) {
						return null;
					}

					const identifier = product.upc;
					const data = await offClient.getProductKnowledgePanels(identifier);
					return data || null;
				} catch (error) {
					console.error(
						`Failed to fetch knowledge panel for product ${product.itemId}:`,
						error,
					);
					return null;
				}
			},
			staleTime: 60 * 60 * 1000, // 1 hour
			gcacheTime: 60 * 60 * 1000, // 1
			refetchOnWindowFocus: false,
			enabled: !!product.itemId,
			retry: false,
		})),
	});

	// Create a map of product IDs to their knowledge panel data
	const knowledgePanelMap = new Map();
	knowledgePanelQueries.forEach((query, index) => {
		if (query.data && currentPageItems[index]) {
			knowledgePanelMap.set(currentPageItems[index].itemId, query.data);
		}
	});

	// Pagination handlers
	const goToNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage((prev) => prev + 1);
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	};

	const goToPreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	};

	const goToPage = (pageNumber: number) => {
		setCurrentPage(pageNumber);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	// Generate page buttons
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
				<div className="py-4 text-center">Loading products...</div>
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
					<div className="mb-2 text-lg font-semibold">
						{allProducts.length} products found
						{isLoading && " (loading more...)"}
						<span className="text-muted-foreground ml-2 text-sm font-normal">
							Showing page {currentPage} of {totalPages} (10 products per page)
						</span>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{currentPageItems.map((product: WalmartItem) => (
							<ProductCard
								key={product.itemId}
								product={product}
								knowledgePanelData={knowledgePanelMap.get(product.itemId)}
								isLoadingKnowledgePanel={knowledgePanelQueries.some(
									(query) => query.isLoading && !query.data,
								)}
							/>
						))}
					</div>

					{/* Pagination controls */}
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
