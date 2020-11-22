import { graphql } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import Content from "../components/Content";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import "./TeamPage.css";

// Export Template for use in CMS preview
export const TeamPageTemplate = ({
	pageContext,
	title,
	subtitle,
	featuredImage,
	body
}) => (
	<main className="DefaultPage">
		<PageHeader
			title={title}
			subtitle={subtitle}
			pageContext={pageContext}
			small
		/>

		<section className="section">
			<div className="container">
				<div className="Grid">
					<Img fluid={featuredImage.childImageSharp.fluid} />
					<div>
						<Content source={body} />
					</div>

				</div>
			</div>
		</section>
	</main>
);

const TeamPage = ({ pageContext, data: { page } }) => (
	<Layout
		meta={page.frontmatter.meta || false}
		title={page.frontmatter.title || false}
	>
		<TeamPageTemplate
			pageContext={pageContext}
			{...page.frontmatter}
			body={page.body}
		/>
	</Layout>
);
export default TeamPage;

export const pageQuery = graphql`
	query TeamPage($id: String!) {
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
