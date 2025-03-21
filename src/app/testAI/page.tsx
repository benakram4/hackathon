"use client";

import { useState } from "react";

export default function TestJoke() {
	const [joke, setJoke] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const fetchJoke = async () => {
		try {
			const response = await fetch("/api/gemini", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ prompt: "Cheemo Perogies" }),
			});
			const data = await response.json();
			if (response.ok) {
				setJoke(data.joke);
				setError(null);
			} else {
				setError(data.error);
				setJoke(null);
			}
		} catch (err) {
			setError("Failed to fetch joke");
			setJoke(null);
		}
	};

	return (
		<div className="p-8 text-center">
			<button
				onClick={() => {
					void fetchJoke();
				}}
				className="rounded bg-blue-500 px-4 py-2 text-white">
				Is Canadian?
			</button>
			{joke && <p className="mt-4">{joke}</p>}
			{error && <p className="mt-4 text-red-500">{error}</p>}
		</div>
	);
}
