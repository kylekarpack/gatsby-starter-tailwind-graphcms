# Gatsby Starter Tailwind CSS & GraphCMS

[![Netlify Status](https://api.netlify.com/api/v1/badges/5d48637f-254b-4afe-afa9-12e607868e1e/deploy-status)](https://app.netlify.com/sites/gatsby-starter-tailwind-graphcms/deploys) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=kylekarpack_gatsby-starter-tailwind-graphcms&metric=security_rating)](https://sonarcloud.io/dashboard?id=kylekarpack_gatsby-starter-tailwind-graphcms) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=kylekarpack_gatsby-starter-tailwind-graphcms&metric=bugs)](https://sonarcloud.io/dashboard?id=kylekarpack_gatsby-starter-tailwind-graphcms)

This Gatsby starter is designed to use highly structured content from a headless CMS such as GraphCMS. All content should be set up with strong parent/child relationships, which allows maximum decoupling of the Gatsby logic and the site structure.

## Overview

Use the following tooling:
- Tailwind CSS for styling
- GraphCMS for structured content
- Netlify for deployment and hosting

Features:
- Slider
- Page headers
- Multi-level menu
- Breadcrumbs
- Page preview component

Pages Included:
- Home page
- Services pages
- Portfolio
- Team members
- Contact

## Demo

https://gatsby-starter-tailwind-graphcms.netlify.app/

## GraphCMS Setup
Directions coming soon. Files in the `/graphcms-fragments` directory give and idea of one possible schema in GraphCMS.

## Development
You'll need a GraphCMS project to start out.
1. Add a `.env.development` file with the following keys:
	```
	GRAPHCMS_PROJECT_API=<your GraphCMS API endpoint>
	GRAPHCMS_PROD_AUTH_TOKEN=<your prod access token>
	GRAPHCMS_DEV_AUTH_TOKEN=<your dev access token>
	ENABLE_GATSBY_REFRESH_ENDPOINT=true
	```
2. `yarn install` or `npm install` to install dependencies
3. `yarn start` to run the Gatsby development server

## Deployment

Coming soon

---

Additional documentation coming soon