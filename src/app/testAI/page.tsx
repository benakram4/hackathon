"use client";

export default function TestJoke() {
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
			console.log(JSON.stringify(data));

			if (response.ok) {
			} else {
			}
		} catch (err) {
			console.error(err);
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
		</div>
	);
}
