import Content from "../components/Content";
import Img from "gatsby-image";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import React from "react";
import { graphql } from "gatsby";

// Export Template for use in CMS preview
export const PortfolioPageTemplate = ({
	pageContext,
	title,
	subtitle,
	featuredImage,
	image,
	body
}) => {
	return (
		<main className="DefaultPage">
			<PageHeader
				title={title}
				subtitle={subtitle}
				pageContext={pageContext}
				backgroundImage={image}
				small
			/>

			<section className="section">
				<div className="container">
					<div className="grid grid-cols-4 gap-12">
						<div className="col-span-4 sm:col-span-2 lg:col-span-3">
							<Content source={body} />
						</div>
						{featuredImage && (
							<div className="col-span-4 sm:col-span-2 lg:col-span-1">
								<Img fluid={featuredImage.childImageSharp.fluid} />
							</div>
						)}
					</div>
				</div>
			</section>
		</main>
	);
};

const PortfolioPage = ({ pageContext, data: { page, image } }) => {
	return (
		<Layout
			meta={page.frontmatter.meta || false}
			title={page.frontmatter.title || false}
		>
			<PortfolioPageTemplate
				pageContext={pageContext}
				{...page.frontmatter}
				body={page.body}
				image={image.frontmatter.featuredImage}
			/>
		</Layout>
	);
};
export default PortfolioPage;

export const pageQuery = graphql`
	query PortfolioPage($id: String!) {
		image: mdx(id: { eq: $id }) {
			frontmatter {
				featuredImage {
					childImageSharp {
						fluid(
							maxWidth: 960
							maxHeight: 125
							quality: 40
							duotone: { highlight: "#FFFFFF", shadow: "#283e21", opacity: 100 }
							cropFocus: CENTER
						) {
							...GatsbyImageSharpFluid_withWebp
						}
					}
				}
			}
		}
		page: mdx(id: { eq: $id }) {
			...Meta
			body
			frontmatter {
				title
				subtitle
				featuredImage {
					childImageSharp {
						fluid(maxWidth: 300) {
							...GatsbyImageSharpFluid
						}
					}
				}
				small
			}
		}
	}
`;
