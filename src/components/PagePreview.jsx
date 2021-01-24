import { graphql, Link, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import Image from "gatsby-image";
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

export const Page = ({
	page,
	page: { frontmatter },
	excerpt,
	overlay,
	readMore,
	height,
	portfolioStyle,
	className
}) => {
	height = height || "200px";
	const isMasonry = portfolioStyle === "masonry";
	console.log(isMasonry);
	const image = frontmatter?.previewImage || frontmatter?.featuredImage;
	return (
		<Link
			className={`hover:opacity-90 max-w-xs w-full rounded overflow-hidden shadow-lg hover:shadow-xl duration-500 transition-all ${
				overlay && "text-center"
			} ${className || ""}`}
			to={page.fields.slug}
		>
			{isMasonry ? (
				<div className="relative">
					<Image fluid={image?.childImageSharp?.fluid} />
					<div className="absolute opacity-0 hover:opacity-100 transition-opacity duration-300 px-4 left-0 right-0 top-0 bottom-0 bg-black bg-opacity-60 text-center flex justify-center items-center">
						<span className="font-bold text-xl text-white px-4 leading-5">
							{frontmatter.title}
							{readMore && (
								<div className="text-primary-400 font-normal text-sm mt-2 cursor-pointer">
									Read more
								</div>
							)}
						</span>
					</div>
				</div>
			) : (
				<div className="Background">
					<BackgroundImage
						style={{ height }}
						fluid={image?.childImageSharp?.fluid}
					>
						{overlay && (
							<div className="w-full h-full flex justify-center items-center bg-black bg-opacity-40">
								<h3 className="font-bold text-xl text-white text-bold px-4">
									{frontmatter.title}
								</h3>
							</div>
						)}
					</BackgroundImage>
				</div>
			)}

			{!(overlay || isMasonry) && (
				<div className="px-6 py-4">
					<>
						<div
							className={`font-bold text-lg leading-5 ${
								frontmatter.subtitle || (frontmatter.excerpt && "mb-2")
							}`}
						>
							{frontmatter.title}
						</div>
						{frontmatter.subtitle && (
							<div className="font-normal text-sm leading-4 mb-2">
								{frontmatter.subtitle}
							</div>
						)}
					</>
					{excerpt && (
						<p className="text-black text-xs mt-2 mb-0">
							<Excerpt text={page.excerpt} />
						</p>
					)}
					{readMore && (
						<small className="text-primary text-sm font-bold mt-2 cursor-pointer">
							Read more
						</small>
					)}
				</div>
			)}
		</Link>
	);
};

const PagePreview = ({ type, excerpt, height, overlay }) => {
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
		<div className="grid justify-center justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
			{pages.map((page, i) => (
				<Page
					page={page}
					excerpt={excerpt}
					overlay={overlay}
					height={height}
					key={i}
					className="Preview"
				/>
			))}
		</div>
	);
};

export default PagePreview;
