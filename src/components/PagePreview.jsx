import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import React from "react";
import "./PagePreview.css";

const Page = ({ page, excerpt, height }) => {
	height = height || "200px";
	let processedExcerpt = "";
	const split = page.excerpt.split(".");
	for (let i = 0; i < split.length; i++) {
		processedExcerpt += split[i];
		processedExcerpt += ".";
		if (processedExcerpt.length > 100) {
			break;
		}
	}
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
			{excerpt && <p className="Excerpt">{processedExcerpt}</p>}
		</a>
	);
};

const PagePreview = ({ type, excerpt, height }) => {
	let pages = useStaticQuery(graphql`
		query {
			allMdx(
				sort: { fields: frontmatter___order }
				filter: { slug: { glob: "pages/**/*" } }
			) {
				nodes {
					fields {
						slug
					}
					excerpt(pruneLength: 1000)
					frontmatter {
						title
						subtitle
						type
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

	if (type) {
		pages = pages.filter((el) => el.frontmatter?.type === type);
	}

	return (
		<div bp="grid 6@md 3@lg">
			{pages.map((page, i) => (
				<Page page={page} excerpt={excerpt} height={height} key={i} />
			))}
		</div>
	);
};

export default PagePreview;
