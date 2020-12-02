import { graphql } from "gatsby";
import React from "react";
import Content from "../components/Content";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import PagePreview from "../components/PagePreview";
import Portfolio from "../components/Portfolio";

// Export Template for use in CMS Default
export const DefaultPageTemplate = (props) => (
	<main className="DefaultPage">
		<PageHeader
			title={props.title}
			subtitle={props.subtitle}
			backgroundImage={props.featuredImage}
			pageContext={props.pageContext}
			breadcrumbs
			small={props.small}
		/>

		<section className="section">
			<div className="container">
				<Content source={props.body} />
				<br />
				{props.previewType && (
					<PagePreview
						type={props.previewType}
						excerpt={props.previewExcerpt}
						height={props.previewHeight}
					/>
				)}
				{props.portfolioCategory && (
					<Portfolio category={props.portfolioCategory} excerpt={true} />
				)}
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
				previewType
				previewHeight
				previewExcerpt
				portfolioCategory
				featuredImage {
					childImageSharp {
						fluid(maxHeight: 400, maxWidth: 1920, cropFocus: CENTER, quality: 50) {
							...GatsbyImageSharpFluid_withWebp
						}
					}
				},
				small
			}
		}
	}
`;
