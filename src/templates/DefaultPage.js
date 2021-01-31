import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import PagePreview from "../components/PagePreview";

const DefaultPage = ({ pageContext, data: { page } }) => {
	const children = [
		...new Map(
			page?.children
				.flatMap((el) => el.portfolios || el)
				.map((item) => [item.id, item])
		).values()
	];
	children.sort((a, b) => a.order - b.order);
	return (
		<Layout meta={page.meta || false} title={page.title || false}>
			<main className="DefaultPage">
				<PageHeader
					title={page.title}
					subtitle={page.subtitle}
					backgroundImage={page.image?.localFile}
					pageContext={pageContext}
					breadcrumbs
					small={true}
				/>

				<section className="section">
					<div className="container main-content">
						<div
							dangerouslySetInnerHTML={{ __html: page.content?.html }}
						></div>
						<br />
						<PagePreview
							items={children}
							options={page.attributes?.preview}
							excerpt
						/>
					</div>
				</section>
			</main>
		</Layout>
	);
};
export default DefaultPage;

export const pageQuery = graphql`
	query DefaultPage($id: String!) {
		page: graphCmsPage(id: { eq: $id }) {
			title
			attributes
			slug
			content {
				html
			}
			image {
				localFile {
					childImageSharp {
						fluid(maxWidth: 960) {
							...GatsbyImageSharpFluid_withWebp
						}
					}
				}
			}
			children: remoteChildren {
				... on GraphCMS_Page {
					id
					title
					attributes
					content {
						html
					}
					image {
						localFile {
							childImageSharp {
								fluid(maxWidth: 960) {
									...GatsbyImageSharpFluid_withWebp
								}
							}
						}
					}
				}
				... on GraphCMS_Category {
					portfolios {
						id
						title
						slug
						order
						content {
							text
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
				... on GraphCMS_TeamMember {
					id
					title
					slug
					order
					content {
						text
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
		}
	}
`;
