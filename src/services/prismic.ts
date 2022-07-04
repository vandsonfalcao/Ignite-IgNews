import * as prismic from "@prismicio/client";

export const endpoint = process.env.PRISMIC_API_ENDPOINT;

export function createClient() {
	const client = prismic.createClient(endpoint, {
		accessToken: process.env.PRISMIC_ACCESS_TOKEN,
	});

	return client;
}
