import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";

import { Page } from "./PagePreview";

const isAll = (category) => {
	return !category || category === "All" || category === "*";
}

const Portfolio = ({ category, excerpt, height }) => {
	const [filter, setFilter] = useState(category || "All");

	let portfolioItems = useStaticQuery(graphql`
		query {
			allMdx(
				sort: { fields: frontmatter___order }
				filter: {
					slug: { glob: "pages/portfolio/*" }
					frontmatter: { status: { eq: "publish" } }
				}
			) {
				nodes {
					fields {
						slug
					}
					excerpt(pruneLength: 1000)
					frontmatter {
						title
						subtitle
						categories
						featuredImage {
							childImageSharp {
								fluid(maxWidth: 400) {
									...GatsbyImageSharpFluid
								}
							}
						}
					}
				}
			}
		}
	`).allMdx.nodes;

	let filters = [
		...new Set(portfolioItems.flatMap((el) => el.frontmatter.categories))
	];
	filters.sort((a, b) => a.localeCompare(b));
	filters.unshift("All");

	if (!isAll(filter)) {
		portfolioItems = portfolioItems.filter((el) =>
			el.frontmatter.categories?.includes(filter)
		);
	}

	return (
		<div className="Portfolio">
			{isAll(category) && (
				<div className="flex justify-center flex-wrap mb-12">
					{filters.map((el, i) => (
						<button
							key={i}
							type="button"
							className={`inline-block px-2 py-1 mx-1 mb-1 text-xs text-center text-white transition bg-gray-900 rounded shadow ripple hover:shadow-lg hover:bg-primary focus:outline-none ${filter === el ? "bg-primary" : ""}`}
							onClick={() => setFilter(el)}
						>
							{el}
						</button>
					))}
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{portfolioItems.map((page, i) => (
					<Page page={page} excerpt={excerpt} height={height} readMore key={i} />
				))}
			</div>
		</div>
	);
};

export default Portfolio;
