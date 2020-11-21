import React from "react";
import { graphql } from "gatsby";

import PageHeader from "../components/PageHeader";
import Content from "../components/Content";
import Layout from "../components/Layout";
import SVGIcon from "../components/SVGIcon";

// Export Template for use in CMS preview
export const DefaultPageTemplate = ({
	title,
	subtitle,
	featuredImage,
	body
}) => (
	<main className="DefaultPage">
		<PageHeader
			title={title}
			subtitle={subtitle}
			backgroundImage={featuredImage}
		/>

		<section className="section">
			<div className="container">
				<Content source={body} />
				<SVGIcon src="/images/calendar.svg" />
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
