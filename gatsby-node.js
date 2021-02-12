const path = require("path");
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`
});

const slugify = (page) => {
	let str = page.slug || "";
	str = str.replace("home", "");
	while (page.parents && page.parents[0]) {
		str = `${page.parents[0].slug}/${str}`;
		page.parents[0] = page.parents[0].parents && page.parents[0].parents[0];
	}
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
			let templateToUse = template;

			// This is pretty sloppy slug management
			switch (page.slug) {
				case "contact":
					templateToUse = "ContactPage";
					break;
				default:
					templateToUse = template;
					break;
			}
			createPage({
				component: path.resolve(`src/templates/${templateToUse}.js`),
				context: {
					slug: page.slug,
					id: page.id,
					page
				},
				path: slugify(page)
			});
		}
	};

	const teamMembers = await graphql(`
		{
			team: allGraphCmsTeamMember {
				nodes {
					id
					slug
					parents {
						slug
					}
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
					parents: categories {
						slug
						parents {
							slug
						}
					}
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
					parents {
						slug
					}
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
