import { graphql, useStaticQuery, Link } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import React from "react";
import "./PagePreview.css";

export const Excerpt = ({ text, minLength = 100 }) => {
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

export const Page = ({ page, excerpt, readMore, height, className }) => {
	height = height || "200px";
	return (
		<Link className={`Page ${className}`} to={page.fields.slug}>
			<div className="Background">
				<BackgroundImage
					style={{ height }}
					fluid={page.frontmatter?.featuredImage?.childImageSharp?.fluid}
				/>
			</div>
			<div className="Title">
				<div className="Name">{page.frontmatter.title}</div>
				{page.frontmatter.subtitle && (
					<div className="Subtitle">{page.frontmatter.subtitle}</div>
				)}
			</div>
			<div className="Caption">
				{excerpt && (
					<p className="Excerpt">
						<Excerpt text={page.excerpt} />
					</p>
				)}
				{readMore && (
					<small className="ReadMore">
						<Link to={page.fields.slug}>Read more</Link>
					</small>
				)}
			</div>
		</Link>
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
				<Page
					page={page}
					excerpt={excerpt}
					height={height}
					key={i}
					className="Preview"
				/>
			))}
		</div>
	);
};

export default PagePreview;
