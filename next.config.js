/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			// {
			// 	protocol: "https",
			// 	hostname: "media.api-sports.io",
			// 	// port: '',
			// 	// pathname: '/account123/**',
			// },
			// {
			// 	protocol: "https",
			// 	hostname: "media-3.api-sports.io",
			// 	// port: '',
			// 	// pathname: '/account123/**',
			// },

			// {
			// 	protocol: "https",
			// 	hostname: "selfbet.s3.af-south-1.amazonaws.com",
			// 	// port: '',
			// 	// pathname: '/account123/**',
			// },

			// {
			// 	protocol: "https",
			// 	hostname: "selfbet01.s3.af-south-1.amazonaws.com",
			// 	// port: '',
			// 	// pathname: '/account123/**',
			// },

			{
				protocol: "https",

				hostname: "selfbet002.s3.amazonaws.com",
			},
		],
	},

	images: {
		domains: [
			// "media-3.api-sports.io",
			// "media.api-sports.io",
			// "selfbet.s3.af-south-1.amazonaws.com",
			// "selfbet01.s3.af-south-1.amazonaws.com",
			"selfbet002.s3.amazonaws.com",
		],
	},
};

module.exports = nextConfig;
