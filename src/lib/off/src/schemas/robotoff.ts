/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
	"/questions/{barcode}": {
		/**
		 * Get questions for a given product
		 * @description Questions are sorted by priority: we want questions with highest impact to be displayed first. The order is the following:
		 *   - category
		 *   - label
		 *   - brand
		 *   - remaining types
		 */
		get: {
			parameters: {
				query?: {
					/** @description The number of questions to return */
					count?: number;
					server_type?: components["parameters"]["server_type"];
					lang?: components["parameters"]["lang"];
					insight_types?: components["parameters"]["insight_types"];
				};
				path: {
					barcode: components["parameters"]["barcode_path"];
				};
			};
			responses: {
				/** @description Questions about the requested product */
				200: {
					content: {
						"application/json": {
							/** @enum {string} */
							status?: "no_questions" | "found";
							questions?: Record<string, never>[];
						};
					};
				};
			};
		};
	};
	"/questions": {
		/** Fetch questions */
		get: {
			parameters: {
				query?: {
					lang?: components["parameters"]["lang"];
					count?: components["parameters"]["count"];
					server_type?: components["parameters"]["server_type"];
					insight_types?: components["parameters"]["insight_types"];
					countries?: components["parameters"]["countries"];
					brands?: components["parameters"]["brands"];
					value_tag?: components["parameters"]["value_tag"];
					page?: components["parameters"]["page"];
					reserved_barcode?: components["parameters"]["reserved_barcode"];
					campaigns?: components["parameters"]["campaigns"];
					predictor?: components["parameters"]["predictor"];
					/**
					 * @description The field to use for ordering results:
					 *   - confidence: order by (descending) model confidence, null confidence insights come last
					 *   - popularity: order by (descending) popularity (=scan count)
					 *   - random: use a random order
					 */
					order_by?: "confidence" | "random" | "popularity";
				};
			};
			responses: {
				/** @description The questions matching the filters */
				200: {
					content: {
						"application/json": {
							/** @enum {string} */
							status?: "no_questions" | "found";
							questions?: Record<string, never>[];
							/** @description The total number of results with the provided filters */
							count?: number;
						};
					};
				};
			};
		};
	};
	"/questions/random": {
		/**
		 * Get random questions
		 * @deprecated
		 */
		get: {
			parameters: {
				query?: {
					lang?: components["parameters"]["lang"];
					count?: components["parameters"]["count"];
					server_type?: components["parameters"]["server_type"];
					insight_types?: components["parameters"]["insight_types"];
					countries?: components["parameters"]["countries"];
					brands?: components["parameters"]["brands"];
					value_tag?: components["parameters"]["value_tag"];
					page?: components["parameters"]["page"];
					reserved_barcode?: components["parameters"]["reserved_barcode"];
					campaigns?: components["parameters"]["campaigns"];
					predictor?: components["parameters"]["predictor"];
				};
			};
			responses: {
				/** @description The queried insights */
				200: {
					content: {
						"application/json": {
							/** @enum {string} */
							status?: "no_questions" | "found";
							questions?: Record<string, never>[];
							/** @description The total number of results with the provided filters */
							count?: number;
						};
					};
				};
			};
		};
	};
	"/questions/popular": {
		/**
		 * Get questions about popular products
		 * @deprecated
		 * @description Questions are ranked by the product popularity (based on scan count).
		 */
		get: {
			parameters: {
				query?: {
					lang?: components["parameters"]["lang"];
					count?: components["parameters"]["count"];
					server_type?: components["parameters"]["server_type"];
					insight_types?: components["parameters"]["insight_types"];
					countries?: components["parameters"]["countries"];
					brands?: components["parameters"]["brands"];
					value_tag?: components["parameters"]["value_tag"];
					page?: components["parameters"]["page"];
					reserved_barcode?: components["parameters"]["reserved_barcode"];
					campaigns?: components["parameters"]["campaigns"];
					predictor?: components["parameters"]["predictor"];
				};
			};
			responses: {
				200: {
					content: object;
				};
			};
		};
	};
	"/questions/unanswered": {
		/**
		 * Get unanswered question counts
		 * @description Get number of unanswered questions grouped by `value_tag`.
		 * The list is ordered from highest count to lowest.
		 */
		get: {
			parameters: {
				query?: {
					/** @description The number of distinct `value_tag`s to return */
					count?: number;
					server_type?: components["parameters"]["server_type"];
					type?: components["parameters"]["insight_type"];
					countries?: components["parameters"]["countries"];
					page?: components["parameters"]["page"];
					reserved_barcode?: components["parameters"]["reserved_barcode"];
					campaigns?: components["parameters"]["campaigns"];
					predictor?: components["parameters"]["predictor"];
				};
			};
			responses: {
				/** @description The number of questions grouped by `value_tag` */
				200: {
					content: {
						"application/json": {
							/** @description The total number of questions that meet the provided criteria */
							count: number;
							questions: (string | number)[];
							/**
							 * @description The request status
							 * @enum {string}
							 */
							status: "found" | "no_questions";
						};
					};
				};
			};
		};
	};
	"/predictions": {
		/** Get predictions */
		get: {
			parameters: {
				query?: {
					count?: components["parameters"]["count"];
					page?: components["parameters"]["page"];
					server_type?: components["parameters"]["server_type"];
					barcode?: components["parameters"]["barcode_query_filter"];
					/** @description Comma-separated list, filter by prediction types */
					types?: string;
				};
			};
			responses: {
				/** @description The queried predictions */
				200: {
					content: {
						"application/json": {
							/** @enum {string} */
							status?: "no_predictions" | "found";
							predictions?: Record<string, never>[];
							/** @description The total number of results with the provided filters */
							count?: number;
						};
					};
				};
			};
		};
	};
	"/insights/random": {
		/**
		 * Get a random insight, use GET /insights?order_by=random instead
		 * @deprecated
		 */
		get: {
			parameters: {
				query?: {
					type?: components["parameters"]["insight_type"];
					countries?: components["parameters"]["countries"];
					value_tag?: components["parameters"]["value_tag"];
					server_type?: components["parameters"]["server_type"];
					count?: components["parameters"]["count"];
					predictor?: components["parameters"]["predictor"];
				};
			};
			responses: {
				200: {
					content: {
						"application/json": {
							insights?: components["schemas"]["InsightSearchResult"][];
						};
					};
				};
			};
		};
	};
	"/insights/{barcode}": {
		/**
		 * Get all insights for a specific product, use GET /insights?barcode={barcode} instead
		 * @deprecated
		 */
		get: {
			parameters: {
				query?: {
					server_type?: components["parameters"]["server_type"];
				};
				path: {
					barcode: components["parameters"]["barcode_path"];
				};
			};
			responses: {
				200: {
					content: object;
				};
			};
		};
	};
	"/insights": {
		/** List insights */
		get: {
			parameters: {
				query?: {
					insight_types?: components["parameters"]["insight_types"];
					barcode?: components["parameters"]["barcode_optional"];
					annotated?: components["parameters"]["insight_filter_annotated"];
					annotation?: components["parameters"]["insight_filter_annotation"];
					value_tag?: components["parameters"]["value_tag"];
					brands?: components["parameters"]["brands"];
					countries?: components["parameters"]["countries"];
					server_type?: components["parameters"]["server_type"];
					predictor?: components["parameters"]["predictor"];
					order_by?: components["parameters"]["insight_order_by"];
					count?: components["parameters"]["count"];
					page?: components["parameters"]["page"];
				};
			};
			responses: {
				200: {
					content: {
						"application/json": {
							insights?: components["schemas"]["InsightSearchResult"][];
							/**
							 * @example found
							 * @enum {string}
							 */
							status?: "no_insights" | "found";
							/**
							 * @description The total number of results with the provided filters
							 * @example 10
							 */
							count?: number;
						};
					};
				};
			};
		};
	};
	"/insights/detail/{id}": {
		/** Get a specific insight */
		get: {
			parameters: {
				path: {
					/** @description ID of the insight */
					id: string;
				};
			};
			responses: {
				200: {
					content: object;
				};
			};
		};
	};
	"/insights/annotate": {
		/**
		 * Submit an annotation
		 * @description The annotation can be submitted as an anonymous user or as a registered user.
		 * If the user is anonymous, the annotation will be accounted as a vote, and several identical
		 * anonymous votes are required to apply the insight. If the vote is sent from a registered user,
		 * it is applied directly.
		 *
		 * To send the annotation as a registered user, send Open Food Facts credentials to the API using
		 * Basic Authentication: add a `Authorization: basic {ENCODED_BASE64}` header where `{ENCODED_BASE64}`
		 * is an base64-encoded string of `user:password`. Don't provide an authentication header for anonymous
		 * users.
		 *
		 * The annotation is an integer that can take 4 values: `0`, `1`, `2`, `-1`. `0` means the insight is incorrect
		 * (so it won't be applied), `1` means it is correct (so it will be applied) and `-1` means the insight
		 * won't be returned to the user (_skip_). `2` is used when user submit some data to the annotate endpoint
		 * (for example in some cases of category annotation or ingredients spellcheck).
		 *
		 * We use the voting mecanism system to remember which insight to skip for a user (authenticated or not).
		 */
		post: {
			requestBody: {
				content: {
					"application/x-www-form-urlencoded": {
						/** @description ID of the insight */
						insight_id: string;
						/**
						 * @description Annotation of the prediction: 1 to accept the prediction, 0 to refuse it, and -1 for _skip_, 2 to accept and add data
						 * @enum {integer}
						 */
						annotation: 0 | 1 | -1 | 2;
						/**
						 * @description Send the update to Openfoodfacts if `update=1`, don't send the update otherwise. This parameter is useful if the update is performed client-side
						 * @default 1
						 * @enum {integer}
						 */
						update?: 0 | 1;
						/** @description Additional data provided by the user as key-value pairs */
						data?: Record<string, never>;
					};
				};
			};
			responses: {
				200: {
					content: object;
				};
			};
		};
	};
	"/insights/dump": {
		/**
		 * Generate a CSV dump
		 * @description Generate a CSV dump of insights with specific criteria.
		 * If more than 10,000 insights match provided criteria and `count` is not provided, a `HTTP 400` is returned
		 */
		get: {
			parameters: {
				query?: {
					server_type?: components["parameters"]["server_type"];
					value_tag?: components["parameters"]["value_tag"];
					insight_types?: components["parameters"]["insight_types"];
					barcode?: components["parameters"]["barcode_query_filter"];
					/** @description The annotation status of the insight. If not provided, both annotated and non-annotated insights are returned */
					annotated?: boolean;
					/** @description Maximum number of insights to return. If not provided, an HTTP 400 response may be returned if more than 10,000 insights match the criteria */
					count?: number;
				};
			};
			responses: {
				/** @description The CSV dump */
				200: {
					content: {
						"text/csv": string;
					};
				};
				/** @description HTTP 204 is returned if no insights were found */
				204: {
					content: never;
				};
				/** @description HTTP 400 is returned if more than 10,000 insights match the criteria and `count` is not provided */
				400: {
					content: never;
				};
			};
		};
	};
	"/images/crop": {
		/**
		 * Crop an image
		 * @description This endpoint is currently only used to generate cropped logos on Hunger Games from a
		 * base image and cropping coordinates. Cropping coordinates are relative (between 0.
		 * and 1. inclusive), with (0, 0) being the upper left corner.
		 */
		get: {
			parameters: {
				query?: {
					/** @example https://static.openfoodfacts.org/images/products/211/123/200/5508/3.jpg */
					image_url?: string;
					/** @example 0.47795143723487854 */
					y_min?: number;
					/** @example 0.5583494305610657 */
					x_min?: number;
					/** @example 0.5653171539306641 */
					y_max?: number;
					/** @example 0.6795185804367065 */
					x_max?: number;
				};
			};
			responses: {
				200: {
					content: {
						"image/jpeg": string;
					};
				};
			};
		};
	};
	"/image_predictions": {
		/** Get image predictions */
		get: {
			parameters: {
				query?: {
					count?: components["parameters"]["count"];
					page?: components["parameters"]["page"];
					server_type?: components["parameters"]["server_type"];
					barcode?: components["parameters"]["barcode_query_filter"];
					/** @description if True, only return image predictions that have associated logos (only valid for universal-logo-detector image predictions) */
					with_logo?: boolean;
					/** @description filter by name of the image predictor model */
					model_name?:
						| "universal-logo-detector"
						| "nutrition-table"
						| "nutriscore";
					/** @description filter by type of the image predictor model, currently only 'object_detection' */
					type?: "object_detection";
					/** @description filter by model version value */
					model_version?: string;
					/** @description filter by minimum confidence score value */
					min_confidence?: number;
				};
			};
			responses: {
				/** @description The queried image predictions */
				200: {
					content: {
						"application/json": {
							/** @enum {string} */
							status?: "no_image_predictions" | "found";
							image_predictions?: Record<string, never>[];
							/** @description The total number of results with the provided filters */
							count?: number;
						};
					};
				};
			};
		};
	};
	"/images/logos": {
		/**
		 * Fetch logos
		 * @description Return details about requested logos (maximum 500 logos can be fetched per request).
		 */
		get: {
			parameters: {
				query?: {
					/** @description Comma-separated string of logo IDs */
					logo_ids?: string;
				};
			};
			responses: {
				/** @description The fetch results */
				200: {
					content: {
						"application/json": {
							/** @description Details about requested logos */
							logos: unknown[];
							/** @description Number of returned results */
							count: number;
						};
					};
				};
			};
		};
	};
	"/images/logos/search": {
		/**
		 * Search for logos
		 * @description Search for logos detected using the universal-logo-detector model that
		 * meet some criteria (annotation status, annotated, type,...)
		 */
		get: {
			parameters: {
				query?: {
					server_type?: components["parameters"]["server_type"];
					barcode?: components["parameters"]["barcode_query_filter"];
					/** @description Number of results to return */
					count?: number;
					/**
					 * @description Filter by logo type
					 * @example packager_code
					 */
					type?: string;
					/**
					 * @description Filter by annotated value
					 * @example lidl
					 */
					value?: string;
					/**
					 * @description Filter by taxonomy value, i.e. the canonical value present is the associated taxonomy. This parameter is mutually exclusive with `value`, and should be used for `label` type.
					 * @example en:organic
					 */
					taxonomy_value?: string;
					/** @description Filter logos that have a confidence score above a threshold */
					min_confidence?: number;
					/** @description If true, randomized result order */
					random?: boolean;
					/** @description The annotation status of the logo. If not provided, both annotated and non-annotated logos are returned */
					annotated?: boolean;
				};
			};
			responses: {
				/** @description The search results */
				200: {
					content: {
						"application/json": {
							/** @description Found logos */
							logos: unknown[];
							/** @description Number of returned results */
							count: number;
						};
					};
				};
			};
		};
	};
	"/images/logos/{logo_id}/reset": {
		/**
		 * Reset logo annotation
		 * @description Reset logo annotations, and delete all annotation-associated predictions and insights
		 */
		post: {
			parameters: {
				path: {
					/** @description The ID of the logo whose annotation to reset */
					logo_id: number;
				};
			};
			responses: {
				/** @description HTTP 204 is returned if the reset operation was successful */
				204: {
					content: never;
				};
				/** @description HTTP 404 is returned if the `logo_id` was not found */
				404: {
					content: never;
				};
			};
		};
	};
	"/ann/search": {
		/**
		 * Approximate search for nearest neighbors of a random query logo
		 * @description Return ID and distance of each logo found, the number of neighbors returned and the ID of the query logo.
		 */
		get: {
			parameters: {
				query?: {
					count?: components["parameters"]["ann_search_count"];
					server_type?: components["parameters"]["server_type"];
				};
			};
			responses: {
				/** @description Response from ANN search */
				200: {
					content: {
						"application/json": components["schemas"]["LogoANNSearchResponse"];
					};
				};
			};
		};
	};
	"/ann/search/{logo_id:int}": {
		/**
		 * Approximate search for nearest neighbors of a specified query logo
		 * @description Return ID and distance of each logo found, the number of neighbors returned and the ID of the query logo.
		 */
		get: {
			parameters: {
				query?: {
					count?: components["parameters"]["ann_search_count"];
					server_type?: components["parameters"]["server_type"];
				};
			};
			responses: {
				/** @description Response from ANN search */
				200: {
					content: {
						"application/json": components["schemas"]["LogoANNSearchResponse"];
					};
				};
			};
		};
	};
	"/predict/category": {
		/**
		 * Predict categories for a product
		 * @description Predictions are performed using a neural model.
		 * As input, you can either provide:
		 *
		 * - the `barcode` of a product: Robotoff will fetch the product from
		 *   Product Opener and will use this data as inputs to predict categories.
		 * - expected inputs under a `product` key. The neural category model
		 *   accepts the following fields as input: `product_name`, `ingredients_tags`,
		 *   `ocr`, `nutriments`, `image_embeddings`. All fields are optional (but you should at least provide one).
		 */
		post: {
			requestBody?: {
				content: {
					"application/json":
						| {
								/**
								 * @description The barcode of the product to categorize
								 * @example 748162621021
								 */
								barcode: string;
								/**
								 * @description The server type (=project) to use, such as 'off' (Open Food Facts), 'obf' (Open Beauty Facts),...
								 * Only 'off' is currently supported for category prediction
								 *
								 * @default off
								 * @enum {string}
								 */
								server_type?: "off" | "obf" | "opff" | "opf";
								/**
								 * @description If true, only return the deepest elements in the category taxonomy
								 * (don't return categories that are parents of other predicted categories)
								 */
								deepest_only?: boolean;
								/**
								 * @description The score above which we consider the category to be detected
								 *
								 * @default 0.5
								 */
								threshold?: number;
						  }
						| {
								/**
								 * @description product information used as model input. All fields are optional, but at
								 * least one field must be provided.
								 */
								product: {
									/** @example roasted chicken */
									product_name?: string;
									/**
									 * @description the ingredient list, as an ordered list of ingredient tags
									 * @example [
									 *   "en:chicken",
									 *   "en:salts"
									 * ]
									 */
									ingredients_tags?: string[];
									/**
									 * @description Embeddings of the 10 most recent product images generated with clip-vit-base-patch32 model.
									 * Each item of the list is the embedding of a single image, provided as a list of dimension 512.
									 * Shape: (num_images, 512)
									 */
									image_embeddings?: number[][];
									/**
									 * @description A list of string corresponding to the text extracted from the product images with OCR.
									 * Each element of the list is the text of a single image, the list order doesn't affect predictions.
									 * We use OCR text to detect ingredient mentions and use it as a model input.
									 * For optimal results, this field should be provided even if `ingredients_tags` is provided.
									 */
									ocr?: string[];
									/**
									 * @description Nutriment values. These fields have exactly the same meaning as those of Product Opener.
									 * All fields are optional, only send data for the field for which the value is not missing.
									 */
									nutriments?: {
										fat_100g?: number;
										"saturated-fat_100g"?: number;
										carbohydrates_100g?: number;
										sugars_100g?: number;
										fiber_100g?: number;
										proteins_100g?: number;
										salt_100g?: number;
										"energy-kcal_100g"?: number;
										"fruits-vegetables-nuts_100g"?: number;
									};
								};
								/**
								 * @description If true, only return the deepest elements in the category taxonomy
								 * (don't return categories that are parents of other predicted categories)
								 */
								deepest_only?: boolean;
								/**
								 * @description The score above which we consider the category to be detected
								 *
								 * @default 0.5
								 */
								threshold?: number;
						  };
				};
			};
			responses: {
				/** @description the category predictions */
				200: {
					content: {
						"application/json": {
							neural?: {
								/**
								 * @description The predicted `value_tag`
								 * @example en:roast-chicken
								 */
								value_tag: string;
								/**
								 * @description The confidence score of the model
								 * @example 0.6
								 */
								confidence: number;
							}[];
						};
					};
				};
			};
		};
	};
	"/predict/nutrition": {
		/**
		 * Extract nutritional information from an image
		 * @description We currently only use the OCR text as input, and detect nutrient-value pairs if they are consecutive
		 * to each other in the OCR text (ex: "protein: 10.5g, fat: 2.1g").
		 */
		get: {
			parameters: {
				query: {
					barcode: components["parameters"]["barcode"];
					server_type?: components["parameters"]["server_type"];
					/**
					 * @description a comma-separated list of IDs of images to extract nutritional information from.
					 * If not provided, the 10 most recent images will be used.
					 */
					image_ids?: string;
				};
			};
			responses: {
				/** @description the extracted nutritional information */
				200: {
					content: {
						"application/json": {
							predictions: {
								/**
								 * @description a dict mapping nutrient name (`energy`, `fat`,...) to a list of dict containing detected nutritional information.
								 * The list contains as many elements as the number of detected values for this nutrient. Each element of the list
								 * has the following fields:
								 *   - `raw`: string of the full detected pattern (ex: `Valeur énergétique: 245 kj`)
								 *   - `nutrient`: nutrient mention (`energy`, `saturated_fat`,...)
								 *   - `value`: nutrient value, should be an number (example: `245`)
								 *   - `unit`: nutrient unit associated with the value (one of `kj`, `kcal`, `g`)
								 */
								nutrients: Record<string, never>;
								/**
								 * @description identifier of the version of the predictor used
								 * @example 1
								 */
								predictor_version: string;
								/**
								 * @description predictor used to generate this prediction
								 * @example regex
								 */
								predictor: string;
								/** @description the path of the image the nutrient prediction was generated from */
								source_image: string;
							};
							/** @description list of the IDs of images that were used as input analyzed */
							image_ids: number[];
							/** @description a list of errors that occured during processing */
							errors?: {
								/** @description the identifier of the error */
								error?: string;
								/** @description a full description of the error that occured */
								error_description?: string;
							}[];
						};
					};
				};
				/** @description An HTTP 400 is returned if the provided parameters are invalid */
				400: {
					content: never;
				};
			};
		};
	};
	"/predict/ocr_prediction": {
		/** Generate OCR predictions an OCR JSON */
		get: {
			parameters: {
				query: {
					/** @description The URL of the OCR JSON to use for extraction */
					ocr_url: string;
					server_type?: components["parameters"]["server_type"];
					/**
					 * @description a comma-separated list of prediction types to use for extraction. If not provided, we use the default:
					 * set of OCR prediction types (see `DEFAULT_OCR_PREDICTION_TYPES` variable in Robotoff codebase)
					 */
					prediction_types?: string;
				};
			};
			responses: {
				/** @description the extracted predictions */
				200: {
					content: {
						"application/json": {
							/** @description a list of extracted predictions */
							predictions: components["schemas"]["Prediction"][];
						};
					};
				};
				/** @description An HTTP 400 is returned if the provided parameters are invalid */
				400: {
					content: never;
				};
			};
		};
	};
	"/predict/lang": {
		/**
		 * Predict the language of a text
		 * @description Predict the language of a text using a neural model.
		 * A POST version of this endpoint is also available, it accepts a JSON body with exactly the
		 * same parameters.
		 *
		 * Use the POST version if you want to predict the language of a long text, as the GET version
		 * has a limit on the length of the text that can be provided.
		 */
		get: {
			parameters: {
				query: {
					/** @description The text to predict language of */
					text: string;
					/** @description the number of predictions to return */
					k?: number;
					/** @description the minimum probability for a language to be returned */
					threshold?: number;
				};
			};
			responses: {
				/** @description the predicted languages */
				200: {
					content: {
						"application/json": {
							/** @description a list of predicted languages, sorted by descending probability */
							predictions?: {
								/**
								 * @description the predicted language (2-letter code)
								 * @example en
								 */
								lang?: string;
								/**
								 * @description the probability of the predicted language
								 * @example 0.9
								 */
								confidence?: number;
							}[];
						};
					};
				};
				/** @description An HTTP 400 is returned if the provided parameters are invalid */
				400: {
					content: never;
				};
			};
		};
	};
	"/predict/lang/product": {
		/**
		 * Predict the languages of the product
		 * @description Return the most common languages present on the product images, based on word-level
		 * language detection from product images.
		 *
		 * Language detection is not performed on the fly, but is based on predictions of type
		 * `image_lang` stored in the `prediction` table.
		 */
		get: {
			parameters: {
				query: {
					barcode: components["parameters"]["barcode"];
					/** @description the minimum probability for a language to be returned */
					server_type?: components["parameters"]["server_type"];
				};
			};
			responses: {
				/** @description The predicted languages, sorted by descending probability. */
				200: {
					content: {
						"application/json": {
							/**
							 * @description the number of words detected for each language, over all images,
							 * sorted by descending count
							 */
							counts?: {
								/**
								 * @description the predicted language (2-letter code). `null` if the language could not be detected.
								 * @example en
								 */
								lang?: string;
								/**
								 * @description the number of words for which this language was detected over all images
								 * @example 10
								 */
								count?: number;
							}[];
							/**
							 * @description the percentage of words detected for each language, over all images,
							 * sorted by descending percentage
							 */
							percent?: {
								/**
								 * @description the predicted language (2-letter code). `null` if the language could not be detected.
								 * @example en
								 */
								lang?: string;
								/**
								 * @description the percentage of words for which the language was detected over all images
								 * @example 80.5
								 */
								percent?: number;
							}[];
							/** @description the IDs of the images that were used to generate the predictions */
							image_ids?: number[];
						};
					};
				};
				/** @description An HTTP 400 is returned if the provided parameters are invalid */
				400: {
					content: never;
				};
			};
		};
	};
	"/batch/import": {
		/**
		 * Import batch processed data to the Robotoff database.
		 * @description Trigger import of the batch processed data to the Robotoff database. A `BATCH_JOB_KEY` is expected in the authorization header. This endpoint is mainly used by the batch job once the job is finished.
		 */
		post: {
			parameters: {
				query: {
					job_type: components["parameters"]["job_type"];
				};
			};
			responses: {
				/** @description Data successfully imported. */
				200: {
					content: {
						"application/json": unknown;
					};
				};
				/** @description An HTTP 400 is returned if the authentification key is invalid or if the job_type is not supported. */
				400: {
					content: never;
				};
			};
		};
	};
}

export type webhooks = Record<string, never>;

export interface components {
	schemas: {
		LogoANNSearchResponse: {
			/** @description Each item corresponds to a neighbor logo */
			results: {
				/**
				 * @description ID of the result logo
				 * @example 1
				 */
				logo_id: number;
				/**
				 * @description distance between the query logo and the result logo (closer to 0 means a more similar logo)
				 *
				 * @example 0.1
				 */
				distance: number;
			}[];
			/** @description Number of returned results */
			count: number;
			/** @description ID of the query logo */
			query_logo_id: number;
		};
		/**
		 * @description An insight search result as returned by /insights/random or /insights/{barcode}
		 * @example {
		 *   "id": "3cd5aecd-edcc-4237-87d0-6595fc4e53c9",
		 *   "type": "label",
		 *   "barcode": 9782012805866
		 * }
		 */
		InsightSearchResult: {
			/** @description Insight ID */
			id: string;
			/** @description Insight type */
			type: string;
			/** @description Barcode of the product */
			barcode: number;
			/** @description country tags of the product */
			countries: string[];
		};
		/**
		 * @description The server domain associated with the image/product.
		 *
		 * If the `server_domain` top level domain does not match the server configuration,
		 * an HTTP 400 error will be raised
		 *
		 * @example api.openfoodfacts.org
		 * @enum {string}
		 */
		ServerDomainParameter:
			| "api.openfoodfacts.org"
			| "api.openbeautyfacts.org"
			| "api.openproductfacts.org"
			| "api.openpetfoodfacts.org"
			| "api.pro.openfoodfacts.org";
		/** @description a Robotoff Prediction */
		Prediction: {
			/**
			 * @description barcode of the product
			 * @example 5410041040807
			 */
			barcode?: string;
			/**
			 * @description the prediction type
			 * @example category
			 */
			type?: string;
			/**
			 * Format: date-time
			 * @description datetime of creation of the prediction
			 * @example 2023-05-13 02:10:09.107262
			 */
			timestamp?: string;
			/**
			 * @description a JSON structure containing prediction data. It either complements `value` and `value_tag`
			 * with additional data or contains the full prediction data.
			 */
			data?: Record<string, never>;
			/**
			 * @description the value tag of the prediction. The use of this field depends of the prediction type,
			 * but it contains most of the time the canonical tag that should be sent to Product Opener.
			 * For example, for a category prediction, `value_tag` can be `en:beverages`.
			 *
			 * @example en:beverages
			 */
			value_tag?: string;
			/**
			 * @description the value of the prediction. It is used if no canonical tag can be used
			 * for the prediction type. For example, we use it to store the detected product weight
			 * value (example: `100 g`)
			 *
			 * @example null
			 */
			value?: string;
			/**
			 * @description a boolean indicating whether we're confident enough in the prediction to apply it
			 * automatically in Open Food Facts without human supervision. This does not mean it will
			 * indeed be applied automatically, please refer to the import mechanism description in the
			 * documentation to know how automatic processing works.
			 *
			 * @example false
			 */
			automatic_processing?: boolean;
			/**
			 * @description the path of the image the prediction was generated from.
			 * May be null, it is mainly provided for OCR and object detection-based predictions.
			 *
			 * @example 541/004/104/0807/3.jpg
			 */
			source_image?: string;
			/**
			 * @description unique ID of the prediction in the PostgreSQL DB
			 * @example 1522429
			 */
			id?: number;
			/**
			 * @description this is a version ID that is used to know when to replace predictions in database
			 * by new ones during import, and when to keep them. It is either an incrementing integer
			 * (for regex-based predictions) or the version of the model that generated the predictions.
			 *
			 * @example keras-image-embeddings-3.0
			 */
			predictor_version?: string;
			/**
			 * @description name of the predictor that generated the prediction. Every insight type has its own `predictor`s, but most common ones are:
			 *   - `universal-logo-detector` for predictions generated by the nearest-neighbors logo detector
			 *   - `flashtext` for all predictions generated using flashtext library
			 *   - `regex` for all predictions generated using simple regex
			 *
			 * @example neural
			 */
			predictor?: string;
			/**
			 * @description The server type (=project) to use, such as 'off' (Open Food Facts), 'obf' (Open Beauty Facts),...
			 * @example off
			 * @enum {string}
			 */
			server_type?: "off" | "obf" | "opff" | "opf" | "off_pro";
			/**
			 * Format: number
			 * @description confidence score of the prediction, it is only provided for ML-based predictions. It may be null.
			 *
			 * @example 0.95
			 */
			confidence?: string;
		};
	};
	responses: never;
	parameters: {
		/** @description The language of the question/value */
		lang?: string;
		/** @description The number of items to return */
		count?: number;
		/** @description Filter by barcode value */
		barcode_query_filter?: string;
		/** @description The server type (=project) to use, such as 'off' (Open Food Facts), 'obf' (Open Beauty Facts),... */
		server_type?: "off" | "obf" | "opff" | "opf" | "off_pro";
		/** @description Comma-separated list, filter by insight types */
		insight_types?: string;
		/** @description Filter by insight type */
		insight_type?: string;
		/**
		 * @description Comma separated list, filter by country value (2-letter code)
		 * @example uk
		 */
		countries?: string;
		/** @description Comma-separated list, filter by brands */
		brands?: string;
		/**
		 * @description Filter by value tag, i.e the value that is going to be sent to Product Opener
		 * @example en:organic
		 */
		value_tag?: string;
		/** @description Page index to return (starting at 1) */
		page?: number;
		/** @description If true, also return questions about products with reserved barcodes */
		reserved_barcode?: boolean;
		/** @description Filter by annotation campaigns (the insight must have all the campaigns) An annotation campaigns allows to only retrieve questions about selected products, based on arbitrary criteria */
		campaigns?: string;
		/** @description Filter by predictor value A predictor refers to the model/method that was used to generate the prediction. */
		predictor?: string;
		/**
		 * @description How to order by insight results.
		 * By default, results are not ordered. Possible values are:
		 *   - `random`: insights are ordered randomly
		 *   - `popularity`: insights are returned by decreasing popularity, using the number of scans as proxy
		 */
		insight_order_by?: "random" | "popularity";
		/** @description Number of neighbors to return */
		ann_search_count?: number;
		/** @description The barcode of the product */
		barcode_path: number;
		/** @description The barcode of the product */
		barcode: number;
		/** @description Filter by barcode value */
		barcode_optional?: number;
		/** @description Filter by annotation status of the insight. A true value (`1`, `true`) means we only return annotated insights, a false value (`0`, `false`) only non-annotated insights. If the parameter is not provided, both annotated and non-annotated insights are returned. */
		insight_filter_annotated?: boolean;
		/** @description Filter by annotation value of the insight. If not provided, all insights are returned. This works in conjunction with the `annotated` parameter. */
		insight_filter_annotation?: number;
		/** @description The type of batch job launched. */
		job_type: "ingredients_spellcheck";
	};
	requestBodies: never;
	headers: never;
	pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
