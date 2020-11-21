import { graphql } from "gatsby";
import React from "react";
import Content from "../components/Content";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";

// Export Template for use in CMS preview
export const DefaultPageTemplate = ({
	title,
	subtitle,
	featuredImage,
	headerHeight,
	body
}) => (
	<main className="DefaultPage">
		<PageHeader
			title={title}
			subtitle={subtitle}
			backgroundImage={featuredImage}
			height={headerHeight}
		/>

		<section className="section">
			<div className="container">
				<Content source={body} />
			</div>
		</section>
	</main>
);

const DefaultPage = ({ data: { page } }) => (
	<Layout
		meta={page.frontmatter.meta || false}
		title={page.frontmatter.title || false}
	>
		<DefaultPageTemplate {...page.frontmatter} body={page.body} />
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
				featuredImage
			}
		}
	}
`;
