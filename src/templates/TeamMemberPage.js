import Content from "../components/Content";
import Img from "gatsby-image";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import React from "react";
import { graphql } from "gatsby";

// Export Template for use in CMS preview
export const TeamMemberPageTemplate = ({
	pageContext,
	title,
	subtitle,
	image,
	banner,
	body
}) => {
	return (
		<main className="DefaultPage">
			<PageHeader
				title={title}
				subtitle={subtitle}
				pageContext={pageContext}
				backgroundImage={banner}
				breadcrumbs
				small
			/>

			<section className="section">
				<div className="container">
					<div className="grid grid-cols-4 gap-12">
						{image && (
							<div className="col-span-4 sm:col-span-2 lg:col-span-1">
								<img src={image.url} />
							</div>
						)}
						<div className="col-span-4 sm:col-span-2 lg:col-span-3">
							<div dangerouslySetInnerHTML={{__html: body}}></div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

const TeamMemberPage = ({ pageContext, data: {page, images} }) => {
	
	const image = {
		childImageSharp:
			images.nodes[Math.floor(Math.random() * images.nodes.length)]
	};
	return (
		<Layout
			meta={false}
			title={page.title || false}
		>
			<TeamMemberPageTemplate
				pageContext={pageContext}
				{...page}
				body={page.content.html}
				banner={image}
			/>
		</Layout>
	);
};
export default TeamMemberPage;

export const pageQuery = graphql`
	query TeamMemberPage($id: String!) {
		images: allImageSharp(
			filter: {
				fluid: { src: { glob: "**/*.jpg" } }
				resolutions: { aspectRatio: { gt: 3 } }
			} # banner images by aspect
		) {
			nodes {
				fluid(duotone: { highlight: "#FFFFFF", shadow: "#3C5E31" }) {
					...GatsbyImageSharpFluid
				}
			}
		}
		page: graphCmsTeamMember(id: { eq: $id }) {
			title
			subtitle
			content {
				html
			}
			image {
				url
			}
		}
	}
`;
