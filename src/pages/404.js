import { Link, StaticQuery, graphql } from "gatsby";

import AlertTriangle from "react-feather/dist/icons/alert-triangle";
import Helmet from "react-helmet";
import Layout from "../components/Layout";
import React from "react";
import _get from "lodash/get";

export default ({ children }) => (
	<StaticQuery
		query={graphql`
			query NotFoundPageQuery {
				globalSettings: settingsYaml {
					siteTitle
				}
			}
		`}
		render={(data) => (
			<Layout>
				<Helmet>
					<title>404 – Page Not Found</title>
				</Helmet>
				<section className="section thick">
					<div className="container skinny text-center">
						<p>
							<AlertTriangle size="5rem" />
						</p>
						<h1>404 - Page Not Found</h1>
						<p>
							We can't find the page you are looking for!
							<br />
							Head back to{" "}
							<Link to="/">
								{_get(data, "globalSettings.siteTitle")}
							</Link>
						</p>
					</div>
				</section>
			</Layout>
		)}
	/>
);
