import { graphql } from "gatsby";
import React from "react";
import { slugify } from "../../util";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import PagePreview from "../components/PagePreview";
import Slider from "../components/Slider";

const DefaultPage = ({ pageContext, data: { page } }) => {
	const children = [
		...new Map(
			page?.children
				?.flatMap((el) => el.portfolios || el)
				?.map((item) => {
					const slug = slugify(item);
					return [item.id, { ...item, slug }];
				})
		).values()
	];
	children.sort((a, b) => a.order - b.order);

	return (
		<Layout meta={page.meta || false} title={page.title || false}>
			<main className="DefaultPage">
				{page.slider ? (
					<Slider
						title={page.subtitle || page.title}
						slides={page.slider.slides}
					/>
				) : (
					<PageHeader
						title={page.title}
						subtitle={page.subtitle}
						backgroundImage={page.image?.localFile}
						pageContext={pageContext}
						breadcrumbs
						small={true}
					/>
				)}

				<section className="section">
					<div className="container main-content">
						<div
							className="body-content"
							dangerouslySetInnerHTML={{ __html: page.content?.html }}
						></div>

						{children?.length ? (
							<div>
								<br />
								<PagePreview
									items={children}
									options={page.attributes?.preview}
									excerpt
								/>
							</div>
						) : null}
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
			subtitle
			attributes
			slug
			order
			content {
				html
			}
			image {
				...imageWide
			}
			slider {
				slides {
					title
					image {
						...imageWide
					}
				}
			}
			children: remoteChildren {
				... on GraphCMS_Page {
					id
					title
					slug
					attributes
					order
					content {
						html
					}
					image {
						...imageWide
					}
					previewImage {
						...image
					}
					parents {
						slug
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
						categories {
							title
							slug
						}
						parents: categories {
							slug
							parents {
								slug
							}
						}
						image {
							...image
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
						...image
					}
					parents {
						slug
					}
				}
			}
		}
	}
`;
