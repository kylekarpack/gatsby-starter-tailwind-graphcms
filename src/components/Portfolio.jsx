import { graphql, useStaticQuery } from "gatsby";
import React, { useState } from "react";
import { Page } from "./PagePreview";
import "./PagePreview.css";
import "./Portfolio.css";

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
				<div className="Filters">
					{filters.map((el, i) => (
						<button
							key={i}
							type="button"
							className={`filter ${filter === el ? "active" : ""}`}
							onClick={() => setFilter(el)}
						>
							{el}
						</button>
					))}
				</div>
			)}
			<div bp="grid 1 6@sm 4@md 3@lg">
				{portfolioItems.map((page, i) => (
					<Page page={page} excerpt={excerpt} height={height} readMore key={i} />
				))}
			</div>
		</div>
	);
};

export default Portfolio;
