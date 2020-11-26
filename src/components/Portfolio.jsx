import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import React, { useState } from "react";
import "./PagePreview.css";

const Excerpt = ({ text, minLength = 100 }) => {
	text = text || "";
	let processedExcerpt = "";
	const split = text.split(".");
	for (let i = 0; i < split.length; i++) {
		processedExcerpt += split[i];
		processedExcerpt += ".";
		if (processedExcerpt.length > minLength) {
			break;
		}
	}
	return <>{processedExcerpt}</>;
};

const Page = ({ page, excerpt, height }) => {
	height = height || "200px";
	return (
		<a className="Page" href={page.fields.slug}>
			<div className="Page--main">
				<BackgroundImage
					style={{ height }}
					fluid={page.frontmatter?.featuredImage?.childImageSharp?.fluid}
				/>
				<div className="caption">
					<div className="name">{page.frontmatter.title}</div>
					{page.frontmatter.subtitle && (
						<div className="subtitle">{page.frontmatter.subtitle}</div>
					)}
				</div>
			</div>
			{excerpt && (
				<p className="Excerpt">
					<Excerpt text={page.excerpt} />
				</p>
			)}
		</a>
	);
};

const Portfolio = ({ category, excerpt, height }) => {
	const [filter, setFilter] = useState(category);

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

	if (filter) {
		console.log(filter, portfolioItems);
		portfolioItems = portfolioItems.filter((el) =>
			el.frontmatter.categories?.includes(filter)
		);
	}

	return (
		<>
			<div className="filters">
				{filters.map((el, i) => (
					<button
						key={i}
						type="button"
						className={filter === el ? "active" : ""}
						onClick={() => setFilter(el)}
					>
						{el}
					</button>
				))}
			</div>
			<div bp="grid 6@md 3@lg">
				{portfolioItems.map((page, i) => (
					<Page page={page} excerpt={excerpt} height={height} key={i} />
				))}
			</div>
		</>
	);
};

export default Portfolio;
