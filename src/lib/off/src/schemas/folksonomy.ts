/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
	"/": {
		/** Hello */
		get: operations["hello__get"];
	};
	"/auth": {
		/**
		 * Authentication
		 * @description Authentication: provide user/password and get a bearer token in return
		 *
		 * - **username**: Open Food Facts user_id (not email)
		 * - **password**: user password (clear text, but HTTPS encrypted)
		 *
		 * token is returned, to be used in later requests with usual "Authorization: bearer token" headers
		 */
		post: operations["authentication_auth_post"];
	};
	"/auth_by_cookie": {
		/**
		 * Authentication
		 * @description Authentication: provide Open Food Facts session cookie and get a bearer token in return
		 *
		 * - **session cookie**: Open Food Facts session cookie
		 *
		 * token is returned, to be used in later requests with usual "Authorization: bearer token" headers
		 */
		post: operations["authentication_auth_by_cookie_post"];
	};
	"/products/stats": {
		/**
		 * Product Stats
		 * @description Get the list of products with tags statistics
		 *
		 * The products list can be limited to some tags (k or k=v)
		 */
		get: operations["product_stats_products_stats_get"];
	};
	"/products": {
		/**
		 * Product List
		 * @description Get the list of products matching k or k=v
		 */
		get: operations["product_list_products_get"];
	};
	"/product/{product}": {
		/**
		 * Product Tags List
		 * @description Get a list of existing tags for a product
		 */
		get: operations["product_tags_list_product__product__get"];
	};
	"/product/{product}/{k}": {
		/**
		 * Product Tag
		 * @description Get a specific tag or tag hierarchy on a product
		 *
		 * - /product/xxx/key returns only the requested key
		 * - /product/xxx/key* returns the key and subkeys (key:subkey)
		 */
		get: operations["product_tag_product__product___k__get"];
		/**
		 * Product Tag Delete
		 * @description Delete a product tag
		 */
		delete: operations["product_tag_delete_product__product___k__delete"];
	};
	"/product/{product}/{k}/versions": {
		/**
		 * Product Tag List Versions
		 * @description Get a list of all versions of a tag for a product
		 */
		get: operations["product_tag_list_versions_product__product___k__versions_get"];
	};
	"/product": {
		/**
		 * Product Tag Update
		 * @description Update a product tag
		 *
		 * - **product**: which product
		 * - **k**: which key for the tag
		 * - **v**: which value to set for the tag
		 * - **version**: must be equal to previous version + 1
		 * - **owner**: None or empty for public tags, or your own user_id
		 */
		put: operations["product_tag_update_product_put"];
		/**
		 * Product Tag Add
		 * @description Create a new product tag (version=1)
		 *
		 * - **product**: which product
		 * - **k**: which key for the tag
		 * - **v**: which value to set for the tag
		 * - **version**: none or empty or 1
		 * - **owner**: none or empty for public tags, or your own user_id
		 *
		 * Be aware it's not possible to create the same tag twice. Though, you can update
		 * a tag and add multiple values the way you want (don't forget to document how); comma
		 * separated list is a good option.
		 */
		post: operations["product_tag_add_product_post"];
	};
	"/keys": {
		/**
		 * Keys List
		 * @description Get the list of keys with statistics
		 *
		 * The keys list can be restricted to private tags from some owner
		 */
		get: operations["keys_list_keys_get"];
	};
	"/ping": {
		/**
		 * Pong
		 * @description Check server health
		 */
		get: operations["pong_ping_get"];
	};
}

export type webhooks = Record<string, never>;

export interface components {
	schemas: {
		/** Body_authentication_auth_post */
		Body_authentication_auth_post: {
			/** Grant Type */
			grant_type?: string;
			/** Username */
			username: string;
			/** Password */
			password: string;
			/**
			 * Scope
			 * @default
			 */
			scope?: string;
			/** Client Id */
			client_id?: string;
			/** Client Secret */
			client_secret?: string;
		};
		/** HTTPValidationError */
		HTTPValidationError: {
			/** Detail */
			detail?: components["schemas"]["ValidationError"][];
		};
		/** ProductList */
		ProductList: {
			/** Product */
			product: string;
			/** K */
			k: string;
			/** V */
			v: string;
		};
		/** ProductStats */
		ProductStats: {
			/** Product */
			product: string;
			/** Keys */
			keys: number;
			/** Editors */
			editors: number;
			/**
			 * Last Edit
			 * Format: date-time
			 */
			last_edit: string;
		};
		/** ProductTag */
		ProductTag: {
			/** Product */
			product: string;
			/** K */
			k: string;
			/** V */
			v: string;
			/**
			 * Owner
			 * @default
			 */
			owner?: string;
			/**
			 * Version
			 * @default 1
			 */
			version?: number;
			/** Editor */
			editor?: string;
			/**
			 * Last Edit
			 * Format: date-time
			 */
			last_edit?: string;
			/**
			 * Comment
			 * @default
			 */
			comment?: string;
		};
		/** ValidationError */
		ValidationError: {
			/** Location */
			loc: string[];
			/** Message */
			msg: string;
			/** Error Type */
			type: string;
		};
	};
	responses: never;
	parameters: never;
	requestBodies: never;
	headers: never;
	pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {
	/** Hello */
	hello__get: {
		responses: {
			/** @description Successful Response */
			200: {
				content: {
					"application/json": unknown;
				};
			};
		};
	};
	/**
	 * Authentication
	 * @description Authentication: provide user/password and get a bearer token in return
	 *
	 * - **username**: Open Food Facts user_id (not email)
	 * - **password**: user password (clear text, but HTTPS encrypted)
	 *
	 * token is returned, to be used in later requests with usual "Authorization: bearer token" headers
	 */
	authentication_auth_post: {
		requestBody: {
			content: {
				"application/x-www-form-urlencoded": components["schemas"]["Body_authentication_auth_post"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				content: {
					"application/json": unknown;
				};
			};
			/** @description Validation Error */
			422: {
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	/**
	 * Authentication
	 * @description Authentication: provide Open Food Facts session cookie and get a bearer token in return
	 *
	 * - **session cookie**: Open Food Facts session cookie
	 *
	 * token is returned, to be used in later requests with usual "Authorization: bearer token" headers
	 */
	authentication_auth_by_cookie_post: {
		parameters: {
			cookie?: {
				session?: string;
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				content: {
					"application/json": unknown;
				};
			};
			/** @description Validation Error */
			422: {
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	/**
	 * Product Stats
	 * @description Get the list of products with tags statistics
	 *
	 * The products list can be limited to some tags (k or k=v)
	 */
	product_stats_products_stats_get: {
		parameters: {
			query?: {
				owner?: unknown;
				k?: unknown;
				v?: unknown;
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				content: {
					"application/json": components["schemas"]["ProductStats"][];
				};
			};
			/** @description Validation Error */
			422: {
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	/**
	 * Product List
	 * @description Get the list of products matching k or k=v
	 */
	product_list_products_get: {
		parameters: {
			query?: {
				owner?: unknown;
				k?: unknown;
				v?: unknown;
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				content: {
					"application/json": components["schemas"]["ProductList"][];
				};
			};
			/** @description Validation Error */
			422: {
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	/**
	 * Product Tags List
	 * @description Get a list of existing tags for a product
	 */
	product_tags_list_product__product__get: {
		parameters: {
			query?: {
				owner?: unknown;
			};
			path: {
				product: string;
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				content: {
					"application/json": components["schemas"]["ProductTag"][];
				};
			};
			/** @description Validation Error */
			422: {
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	/**
	 * Product Tag
	 * @description Get a specific tag or tag hierarchy on a product
	 *
	 * - /product/xxx/key returns only the requested key
	 * - /product/xxx/key* returns the key and subkeys (key:subkey)
	 */
	product_tag_product__product___k__get: {
		parameters: {
			query?: {
				owner?: unknown;
			};
			path: {
				product: string;
				k: string;
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				content: {
					"application/json": components["schemas"]["ProductTag"];
				};
			};
			/** @description Validation Error */
			422: {
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	/**
	 * Product Tag Delete
	 * @description Delete a product tag
	 */
	product_tag_delete_product__product___k__delete: {
		parameters: {
			query: {
				version: number;
				owner?: unknown;
			};
			path: {
				product: string;
				k: string;
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				content: {
					"application/json": unknown;
				};
			};
			/** @description Validation Error */
			422: {
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	/**
	 * Product Tag List Versions
	 * @description Get a list of all versions of a tag for a product
	 */
	product_tag_list_versions_product__product___k__versions_get: {
		parameters: {
			query?: {
				owner?: unknown;
			};
			path: {
				product: string;
				k: string;
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				content: {
					"application/json": components["schemas"]["ProductTag"][];
				};
			};
			/** @description Validation Error */
			422: {
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	/**
	 * Product Tag Update
	 * @description Update a product tag
	 *
	 * - **product**: which product
	 * - **k**: which key for the tag
	 * - **v**: which value to set for the tag
	 * - **version**: must be equal to previous version + 1
	 * - **owner**: None or empty for public tags, or your own user_id
	 */
	product_tag_update_product_put: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["ProductTag"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				content: {
					"application/json": unknown;
				};
			};
			/** @description Validation Error */
			422: {
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	/**
	 * Product Tag Add
	 * @description Create a new product tag (version=1)
	 *
	 * - **product**: which product
	 * - **k**: which key for the tag
	 * - **v**: which value to set for the tag
	 * - **version**: none or empty or 1
	 * - **owner**: none or empty for public tags, or your own user_id
	 *
	 * Be aware it's not possible to create the same tag twice. Though, you can update
	 * a tag and add multiple values the way you want (don't forget to document how); comma
	 * separated list is a good option.
	 */
	product_tag_add_product_post: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["ProductTag"];
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				content: {
					"application/json": unknown;
				};
			};
			/** @description Validation Error */
			422: {
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	/**
	 * Keys List
	 * @description Get the list of keys with statistics
	 *
	 * The keys list can be restricted to private tags from some owner
	 */
	keys_list_keys_get: {
		parameters: {
			query?: {
				owner?: unknown;
			};
		};
		responses: {
			/** @description Successful Response */
			200: {
				content: {
					"application/json": unknown;
				};
			};
			/** @description Validation Error */
			422: {
				content: {
					"application/json": components["schemas"]["HTTPValidationError"];
				};
			};
		};
	};
	/**
	 * Pong
	 * @description Check server health
	 */
	pong_ping_get: {
		responses: {
			/** @description Successful Response */
			200: {
				content: {
					"application/json": unknown;
				};
			};
		};
	};
}
