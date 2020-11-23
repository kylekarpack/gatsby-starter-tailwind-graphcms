import { graphql } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import Content from "../components/Content";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";

// Export Template for use in CMS preview
export const PortfolioPageTemplate = ({
	pageContext,
	title,
	subtitle,
	featuredImage,
	body
}) => {
	return (
		<main className="DefaultPage">
			<PageHeader
				title={title}
				subtitle={subtitle}
				pageContext={pageContext}
				breadcrumbs={false}
				backgroundImage={featuredImage}
				small
			/>

			<section className="section">
				<div className="container">
					<div bp="grid">
						
						<div bp="7">
							<Content source={body} />
						</div>
						{featuredImage && (
							<div bp="5 padding-left--lg">
								<Img fluid={featuredImage.childImageSharp.fluid} />
							</div>
						)}
					</div>
				</div>
			</section>
		</main>
	);
};

const PortfolioPage = ({ pageContext, data: { page } }) => {
	return (
		<Layout
			meta={page.frontmatter.meta || false}
			title={page.frontmatter.title || false}
		>
			<PortfolioPageTemplate
				pageContext={pageContext}
				{...page.frontmatter}
				body={page.body}
			/>
		</Layout>
	);
};
export default PortfolioPage;

export const pageQuery = graphql`
	query PortfolioPage($id: String!) {
		page: mdx(id: { eq: $id }) {
			...Meta
			body
			frontmatter {
				title
				subtitle
				featuredImage {
					childImageSharp {
						fluid(maxWidth: 400) {
							...GatsbyImageSharpFluid
						}
					}
				}
				small
			}
		}
	}
`;
