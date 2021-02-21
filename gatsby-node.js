const path = require("path");
const { slugify } = require("./util");

require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`
});

const pageSlugify = (page) => {
	let str = `${slugify(page)}`;
	str = str.replace("home", ""); // Hacky: reroute home page
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
			let templateToUse;

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
				path: pageSlugify(page)
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
