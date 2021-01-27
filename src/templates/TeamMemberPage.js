import { graphql } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";

const TeamMemberPage = ({ pageContext, data: { page, images } }) => {
	const bannerImage = {
		childImageSharp:
			images.nodes[Math.floor(Math.random() * images.nodes.length)]
	};
	return (
		<Layout meta={false} title={page.title || false}>
			<main>
				<PageHeader
					title={page.title}
					subtitle={page.subtitle}
					pageContext={pageContext}
					backgroundImage={bannerImage}
					breadcrumbs
					small
				/>
				<section className="section">
					<div className="container">
						<div className="grid grid-cols-4 gap-12">
							{page.image && (
								<div className="col-span-4 sm:col-span-2 lg:col-span-1">
									<Img
										fluid={page.image.localFile.childImageSharp.fluid}
									/>
								</div>
							)}
							<div className="col-span-4 sm:col-span-2 lg:col-span-3">
								<div
									dangerouslySetInnerHTML={{
										__html: page.content.html
									}}
								></div>
							</div>
						</div>
					</div>
				</section>
			</main>
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
				localFile {
					childImageSharp {
						fluid(maxWidth: 400) {
							...GatsbyImageSharpFluid_withWebp
						}
					}
				}
			}
		}
	}
`;
