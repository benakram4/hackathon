/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import { extractOffLogos } from "@/atoms/off-data";
import { type WalmartItem } from "@/types";

export function ProductImage({
	item,
	combinedOffData,
}: {
	item: WalmartItem | undefined;
	combinedOffData: any;
}) {
	const { nutriScoreLogo, greenScoreLogo, novaGroupLogo } =
		extractOffLogos(combinedOffData);

	return (
		<div className="overflow-hidden rounded-lg bg-white p-4">
			<div className="relative aspect-square overflow-hidden rounded-md">
				<Zoom>
					<Image
						src={item?.largeImage || "/placeholder.svg?height=200&width=200"}
						alt={item?.name || "Product Image"}
						fill
						style={{
							objectFit: "contain",
						}}
						className="p-6"
					/>
				</Zoom>
				<div className="bg-card/80 absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3 py-2 shadow-md backdrop-blur-sm">
					<Image
						src={nutriScoreLogo}
						alt="Nutri-Score"
						width={50}
						height={50}
						className="object-contain"
					/>
					<Image
						src={greenScoreLogo}
						alt="Green Score"
						width={50}
						height={50}
						className="object-contain"
					/>
					<Image
						src={novaGroupLogo}
						alt="NOVA Group"
						width={20}
						height={20}
						className="object-contain"
					/>
				</div>
			</div>
		</div>
	);
}
