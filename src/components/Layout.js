import "./globalStyles.css";

import React, { Fragment } from "react";
import { StaticQuery, graphql } from "gatsby";

import Footer from "./Footer";
import Helmet from "react-helmet";
import Meta from "./Meta";
import Nav from "./Nav";

export default ({ children, meta, title }) => {
	return (
		<StaticQuery
			query={graphql`
				query IndexLayoutQuery {
					settingsYaml {
						siteTitle
						siteDescription
						googleTrackingId
						socialMediaCard {
							image
						}
					}
					allServices: allMdx(
						sort: { fields: frontmatter___order }
						filter: { slug: { glob: "pages/services/*" } }
					) {
						nodes {
							fields {
								slug
							}
							frontmatter {
								title
								previewImage {
									childImageSharp {
										fluid(maxWidth: 50) {
											...GatsbyImageSharpFluid
										}
									}
								}
								previewImageDuotone: previewImage {
									childImageSharp {
										fluid(
											maxWidth: 50
											duotone: {
												highlight: "#FFFFFF"
												shadow: "#3C5E31"
											}
										) {
											...GatsbyImageSharpFluid
										}
									}
								}
							}
						}
					}
				}
			`}
			render={(data) => {
				const {
					siteTitle,
					socialMediaCard,
					googleTrackingId,
				} = data.settingsYaml || {};
				const subNav = {
					// eslint-disable-next-line no-prototype-builtins
					services: data.allServices.nodes.map((service) => {
						return {
							...service.fields,
							...service.frontmatter
						};
					})
				};

				return (
					<Fragment>
						<Helmet
							defaultTitle={siteTitle}
							titleTemplate={`%s | ${siteTitle}`}
						>
							{title}
							{/* Add font link tags here */}
						</Helmet>

						<Meta
							googleTrackingId={googleTrackingId}
							absoluteImageUrl={
								socialMediaCard &&
								socialMediaCard.image &&
								socialMediaCard.image
							}
							{...meta}
							{...data.settingsYaml}
						/>

						<Nav subNav={subNav} />

						<Fragment>{children}</Fragment>

						<Footer />
					
					</Fragment>
				);
			}}
		/>
	);
};
