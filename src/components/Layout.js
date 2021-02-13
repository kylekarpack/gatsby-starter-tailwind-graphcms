import { graphql, StaticQuery } from "gatsby";
import React, { Fragment } from "react";
import Helmet from "react-helmet";
import Footer from "./Footer";
import "./globalStyles.css";
import Meta from "./Meta";
import Nav from "./Nav";
import Constants from "../../constants";
import { slugify } from "../../util";

// eslint-disable-next-line react/display-name
export default ({ children, meta, title }) => {
	return (
		<StaticQuery
			query={graphql`
				query IndexLayoutQuery {
					# Any subpage queries go here
					services: allGraphCmsPage(
						filter: {
							parents: { elemMatch: { slug: { eq: "services" } } }
						}
					) {
						nodes {
							title
							slug
							order
							parents {
								slug
							}
						}
					}
				}
			`}
			render={(data) => {
				const { siteTitle, socialMediaCard, googleTrackingId } = Constants;

				const services = data.services.nodes.map(el => {
					return {
						...el,
						slug: slugify(el)
					}
				})
				services.sort((a, b) => a.order - b.order);
				const subNav = {
					services
				};

				return (
					<Fragment>
						<Helmet
							defaultTitle={siteTitle}
							titleTemplate={`%s | ${siteTitle}`}
						>
							<title>{title}</title>
							{/* Add font link tags here */}
						</Helmet>

						<Meta
							googleTrackingId={googleTrackingId}
							absoluteImageUrl={socialMediaCard?.image}
							{...meta}
							{...Constants}
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
