const postcssPresetEnv = require("postcss-preset-env");
const {
	siteTitle,
	siteUrl,
	siteDescription,
	gtmId,
	themeColor
} = require("./constants");

require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
	siteMetadata: {
		title: siteTitle,
		siteUrl: siteUrl,
		description: siteDescription
	},
	plugins: [
		"gatsby-plugin-postcss",
		"gatsby-plugin-react-helmet",
		{
			resolve: "gatsby-plugin-google-tagmanager",
			options: {
				id: gtmId,
				includeInDevelopment: true
			}
		},
		{
			resolve: "gatsby-plugin-offline",
			options: {
				workboxConfig: {
					runtimeCaching: [
						{
							// Use CacheFirst since these don't need to be revalidated (same RegExp
							// and same reason as above)
							urlPattern: /(\.js$|\.css$|static\/)/,
							handler: `CacheFirst`
						},
						{
							// Add runtime caching of various other page resources
							urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
							handler: `StaleWhileRevalidate`
						},
						{
							// uploadcare
							urlPattern: /^https:\/\/media.graphcms.com\/[-a-zA-Z0-9@:%_+.~#?&//=]*?\/10x\//,
							handler: `StaleWhileRevalidate`
						}
					],
					skipWaiting: true,
					clientsClaim: true
				}
			}
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: siteTitle,
				short_name: siteTitle.replace(/ /g, "-").toLowerCase(),
				start_url: "/",
				background_color: themeColor,
				theme_color: themeColor,
				// Enables "Add to Homescreen" prompt and disables browser UI (including back button)
				// see https://developers.google.com/web/fundamentals/web-app-manifest/#display
				display: "standalone",
				icon: `${__dirname}/static/favicon.png` // This path is relative to the root of the site.
			}
		},
		{
			resolve: `gatsby-plugin-breadcrumb`,
			options: {
				useAutoGen: true,
				autoGenHomeLabel: `Home`,
				exclude: [
					`/dev-404-page/`,
					`/404/`,
					`/404.html`,
					`/offline-plugin-app-shell-fallback/`
				],
				// trailingSlashes: optional, will add trailing slashes to the end
				// of crumb pathnames. default is false
				trailingSlashes: true
			}
		},
		{
			resolve: "gatsby-source-graphcms",
			options: {
				endpoint: process.env.GRAPHCMS_PROJECT_API,
				token: process.env.GRAPHCMS_PROD_AUTH_TOKEN,
				downloadLocalImages: true
			}
		},
		// images
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		// css (replace with gatsby-plugin-sass for v2)
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				postCssPlugins: [
					postcssPresetEnv({
						browsers: "> 0.5%, last 2 versions, ie 11"
					})
				]
			}
		},
		{
			resolve: `gatsby-plugin-postcss`,
			options: {
				postCssPlugins: [
					require(`postcss-preset-env`)({
						browsers: "> 0.5%, last 2 versions, ie 11"
					})
				]
			}
		},
		{
			resolve: "gatsby-plugin-nprogress",
			options: {
				// Setting a color is optional.
				color: "white",
				// Disable the loading spinner.
				showSpinner: false
			}
		},
		"gatsby-plugin-sitemap"
	]
};
