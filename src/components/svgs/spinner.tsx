import React from "react";

const Spinner = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 200 200"
		className={props.className}
		{...props}>
		<circle
			fill="#16a34a"
			stroke="#16a34a"
			className={props.className}
			strokeWidth="15"
			r="15"
			cx="40"
			cy="65">
			<animate
				attributeName="cy"
				calcMode="spline"
				dur="2"
				values="65;135;65;"
				keySplines=".5 0 .5 1;.5 0 .5 1"
				repeatCount="indefinite"
				begin="-.4"></animate>
		</circle>
		<circle
			fill="#16a34a"
			stroke="#16a34a"
			strokeWidth="15"
			r="15"
			cx="100"
			cy="65">
			<animate
				attributeName="cy"
				calcMode="spline"
				dur="2"
				values="65;135;65;"
				keySplines=".5 0 .5 1;.5 0 .5 1"
				repeatCount="indefinite"
				begin="-.2"></animate>
		</circle>
		<circle
			fill="#16a34a"
			stroke="#16a34a"
			strokeWidth="15"
			r="15"
			cx="160"
			cy="65">
			<animate
				attributeName="cy"
				calcMode="spline"
				dur="2"
				values="65;135;65;"
				keySplines=".5 0 .5 1;.5 0 .5 1"
				repeatCount="indefinite"
				begin="0"></animate>
		</circle>
	</svg>
);

export default Spinner;
