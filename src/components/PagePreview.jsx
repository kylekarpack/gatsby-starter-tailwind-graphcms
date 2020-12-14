import "./PagePreview.css";

import { Link, graphql, useStaticQuery } from "gatsby";

import BackgroundImage from "gatsby-background-image";
import React from "react";

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
	const image =
		page.frontmatter?.previewImage || page.frontmatter?.featuredImage;
	return (
		<Link
			className={`hover:opacity-90 max-w-xs rounded overflow-hidden shadow-lg hover:shadow-xl duration-500 transition-all my-2 ${className}`}
			to={page.fields.slug}
		>
			<div className="Background">
				<BackgroundImage
					style={{ height }}
					fluid={image?.childImageSharp?.fluid}
				/>
			</div>
			<div className="px-6 py-4">
				<div className="font-bold text-lg leading-5 mb-2">
					{page.frontmatter.title}
				</div>
				{page.frontmatter.subtitle && (
					<div className="font-normal text-sm leading-4 mb-2">
						{page.frontmatter.subtitle}
					</div>
				)}
				{excerpt && (
					<p className="text-black text-xs">
						<Excerpt text={page.excerpt} />
					</p>
				)}
				{readMore && (
					<small className="text-primary text-sm font-bold cursor-pointer">
						Read more
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
						previewImage {
							childImageSharp {
								fluid(maxWidth: 300, cropFocus: NORTH) {
									...GatsbyImageSharpFluid
								}
							}
						}
						featuredImage {
							childImageSharp {
								fluid(maxWidth: 300, cropFocus: NORTH) {
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
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
