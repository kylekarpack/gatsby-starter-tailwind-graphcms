import { graphql } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import Content from "../components/Content";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";

// Export Template for use in CMS preview
export const TeamMemberPageTemplate = ({
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
				<div bp="grid">
					<div bp="3">
						<Img fluid={featuredImage.childImageSharp.fluid} />
					</div>
					<div bp="9">
						<Content source={body} />
					</div>
				</div>
			</div>
		</section>
	</main>
);

const TeamMemberPage = ({ pageContext, data: { page } }) => (
	<Layout
		meta={page.frontmatter.meta || false}
		title={page.frontmatter.title || false}
	>
		<TeamMemberPageTemplate
			pageContext={pageContext}
			{...page.frontmatter}
			body={page.body}
		/>
	</Layout>
);
export default TeamMemberPage;

export const pageQuery = graphql`
	query TeamMemberPage($id: String!) {
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
