export type ApiError = {
	detail?: {
		msg: string;
		type: string;
		loc: string[];
	}[];
};

export type NutriPatrolError = {
	error: {
		statusCode: number;
		message: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		details?: any;
	};
};
