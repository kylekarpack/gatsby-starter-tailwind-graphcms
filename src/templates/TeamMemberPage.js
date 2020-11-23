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
					<div bp="grid">
						{featuredImage && (
							<div bp="3 padding-right--lg">
								<Img fluid={featuredImage.childImageSharp.fluid} />
							</div>
						)}
						<div bp="9">
							<Content source={body} />
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

const TeamMemberPage = ({ pageContext, data: { page, images } }) => {
	const image = {
		childImageSharp:
			images.nodes[Math.floor(Math.random() * images.nodes.length)]
	};
	return (
		<Layout
			meta={page.frontmatter.meta || false}
			title={page.frontmatter.title || false}
		>
			<TeamMemberPageTemplate
				pageContext={pageContext}
				{...page.frontmatter}
				body={page.body}
				image={image}
			/>
		</Layout>
	);
};
export default TeamMemberPage;

export const pageQuery = graphql`
	query TeamMemberPage($id: String!) {
		images: allImageSharp(
			filter: { resolutions: { aspectRatio: { gt: 3 } } } # banner images by aspect
		) {
			nodes {
				fluid(
					duotone: { highlight: "#FFFFFF", shadow: "#3C5E31" }
				) {
					...GatsbyImageSharpFluid
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
