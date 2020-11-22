import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import React from "react";
import "./PagePreview.css";

const Page = ({ page, excerpt, height }) => {
	height = height || "200px";
	return (
		<a className="Page" href={page.fields.slug}>
			<div className="Page--main">
				<BackgroundImage
					style={{ height }}
					fluid={page.frontmatter?.featuredImage?.childImageSharp?.fluid}
				/>
				<div className="name">{page.frontmatter.title}</div>
				{page.frontmatter.subtitle && (
					<small>{page.frontmatter.subtitle}</small>
				)}
			</div>
			{excerpt && <p className="Excerpt">{page.excerpt.split(".")[0]}</p>}
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
		<div className="Pages">
			{pages.map((page, i) => (
				<Page page={page} excerpt={excerpt} height={height} key={i} />
			))}
		</div>
	);
};

export default PagePreview;
