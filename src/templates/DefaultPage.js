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
				{false && props.previewType && (
					<>
						<br />
						<PagePreview
							type={props.previewType}
							excerpt={props.previewExcerpt}
							height={props.previewHeight}
						/>
					</>
				)}

				<Portfolio
					excerpt={true}
					height={props.previewHeight}
				/>
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
