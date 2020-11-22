import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import Meta from "./Meta";
import Nav from "./Nav";
import Footer from "./Footer";

import "modern-normalize/modern-normalize.css";
import "./globalStyles.css";

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
							}
						}
					}
				}
			`}
			render={(data) => {
				const { siteTitle, socialMediaCard, googleTrackingId } =
					data.settingsYaml || {};
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
