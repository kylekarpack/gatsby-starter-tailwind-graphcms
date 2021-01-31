const _ = require("lodash");
const path = require("path");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`
});

const slugify = (str) => {
	str = str || "";
	if (!str.startsWith("/")) {
		str = `/${str}`;
	}
	str = str.toLowerCase().replace(/ /g, "-");
	console.log(str);
	return str;
}

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions;

	const createPages = (pages, template) => {
		for (let page of pages) {
			console.log(page.slug, page.id);
			createPage({
				component: path.resolve(`src/templates/${template}.js`),
				context: {
					slug: page.slug,
					id: page.id,
					page
				},
				path: "/" + (page.slug)
			});
		}
	}

	const teamMembers = await graphql(`
		{
			team: allGraphCmsTeamMember {
				nodes {
					id
					slug
				}
			}
		}
	`);

	const portfolioItems = await graphql(`
	{
		portfolio: allGraphCmsPortfolio {
			nodes {
				id
				slug
			}
		}
	}
	`)

	const pageItems = await graphql(`
	{
		page: allGraphCmsPage {
			nodes {
				id
				slug
			}
		}
	}
	`)

	createPages(teamMembers.data.team.nodes, "TeamMemberPage");
	createPages(portfolioItems.data.portfolio.nodes, "PortfolioPage");
	createPages(pageItems.data.page.nodes, "DefaultPage");
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;

	// convert frontmatter images
	fmImagesToRelative(node);

	// Create smart slugs
	// https://github.com/Vagr9K/gatsby-advanced-starter/blob/master/gatsby-node.js
	let slug;
	if (node.internal.type === "Mdx") {
		const fileNode = getNode(node.parent);
		const parsedFilePath = path.parse(fileNode.relativePath);

		if (_.get(node, "frontmatter.slug")) {
			slug = `/${node.frontmatter.slug.toLowerCase()}/`;
		} else if (
			// home page gets root slug
			parsedFilePath.name === "home" &&
			parsedFilePath.dir === "pages"
		) {
			slug = `/`;
		} else if (_.get(node, "frontmatter.title")) {
			slug = `/${_.kebabCase(parsedFilePath.dir)}/${_.kebabCase(
				node.frontmatter.title
			)}/`;
		} else if (parsedFilePath.dir === "") {
			slug = `/${parsedFilePath.name}/`;
		} else {
			slug = `/${parsedFilePath.dir}/`;
		}

		createNodeField({
			node,
			name: "slug",
			value: slug
		});

		// Add contentType to node.fields
		createNodeField({
			node,
			name: "contentType",
			value: parsedFilePath.dir
		});
	}
};

// Random fix for https://github.com/gatsbyjs/gatsby/issues/5700
module.exports.resolvableExtensions = () => [".json"];
