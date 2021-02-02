const path = require("path");
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`
});

const slugify = (str) => {
	str = str || "";
	str = str.replace("home", "");
	if (!str.startsWith("/")) {
		str = `/${str}`;
	}
	str = str.toLowerCase().replace(/ /g, "-");
	return str;
};

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions;

	const createPages = (pages, template) => {
		for (let page of pages) {
			switch (page.slug) {
				case "contact":
					template = "ContactPage";
					break;
			}
			createPage({
				component: path.resolve(`src/templates/${template}.js`),
				context: {
					slug: page.slug,
					id: page.id,
					page
				},
				path: slugify(page.slug)
			});
		}
	};

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
	`);

	const pageItems = await graphql(`
		{
			page: allGraphCmsPage {
				nodes {
					id
					slug
				}
			}
		}
	`);

	createPages(teamMembers.data.team.nodes, "TeamMemberPage");
	createPages(portfolioItems.data.portfolio.nodes, "PortfolioPage");
	createPages(pageItems.data.page.nodes, "DefaultPage");
};

// Random fix for https://github.com/gatsbyjs/gatsby/issues/5700
module.exports.resolvableExtensions = () => [".json"];
