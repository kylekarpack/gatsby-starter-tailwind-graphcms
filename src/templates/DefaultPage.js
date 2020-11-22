import { graphql } from "gatsby";
import React from "react";
import Content from "../components/Content";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";

// Export Template for use in CMS preview
export const DefaultPageTemplate = ({
	pageContext,
	title,
	subtitle,
	featuredImage,
	small,
	body
}) => (
	<main className="DefaultPage">
		<PageHeader
			title={title}
			subtitle={subtitle}
			backgroundImage={featuredImage}
			pageContext={pageContext}
			small={small}
		/>

		<section className="section">
			<div className="container">
				<Content source={body} />
			</div>
		</section>
	</main>
);

const DefaultPage = ({ pageContext, data: { page } }) => (
	<Layout
		meta={page.frontmatter.meta || false}
		title={page.frontmatter.title || false}
	>
		<DefaultPageTemplate
			pageContext={pageContext}
			{...page.frontmatter}
			body={page.body}
		/>
	</Layout>
);
export default DefaultPage;

export const pageQuery = graphql`
	query DefaultPage($id: String!) {
		page: mdx(id: { eq: $id }) {
			...Meta
			body
			frontmatter {
				title
				subtitle
				featuredImage {
					childImageSharp {
						fluid(maxWidth: 1920) {
							...GatsbyImageSharpFluid
						}
					}
				}
				small
			}
		}
	}
`;
