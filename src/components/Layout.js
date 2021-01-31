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
					services: []
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
