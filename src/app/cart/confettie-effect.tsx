import type React from "react";
import { useEffect, useState } from "react";

import confetti from "canvas-confetti";

interface ConfettiEffectProps {
	trigger: boolean;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ trigger }) => {
	const [fired, setFired] = useState(false);

	useEffect(() => {
		if (trigger && !fired) {
			setFired(true);

			// Fire the confetti
			const duration = 3000;
			const animationEnd = Date.now() + duration;
			const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

			function randomInRange(min: number, max: number) {
				return Math.random() * (max - min) + min;
			}

			const interval = setInterval(() => {
				const timeLeft = animationEnd - Date.now();

				if (timeLeft <= 0) {
					return clearInterval(interval);
				}

				const particleCount = 50 * (timeLeft / duration);

				// Shoot confetti from both sides
				void confetti({
					...defaults,
					particleCount,
					origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
					colors: ["#8B5CF6", "#D946EF", "#F97316", "#0EA5E9"],
				});

				void confetti({
					...defaults,
					particleCount,
					origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
					colors: ["#8B5CF6", "#D946EF", "#F97316", "#0EA5E9"],
				});
			}, 250);
		}
	}, [trigger, fired]);

	return null;
};

export default ConfettiEffect;
