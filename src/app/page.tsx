"use client";

import LandingPage from "@/components/landing-page";

export default function Home() {
	// just for demonstration purposes
	// const {
	// 	data: offProduct,
	// 	isLoading: offProductLoading,
	// 	error: offProductError,
	// } = useProductOFF("5000112546415");

	return (
		<div className="min-h-screen">
			<LandingPage />
		</div>
	);
}
