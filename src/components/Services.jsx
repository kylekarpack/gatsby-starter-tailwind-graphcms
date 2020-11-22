import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import React from "react";
import "./Services.css";

const Service = ({ service }) => {
	return <a className="Service" href={service.fields.slug}>
		<BackgroundImage style={{minHeight: "200px"}} fluid={service.frontmatter.featuredImage.childImageSharp.fluid} />
		<div className="name">{service.frontmatter.title}</div>
	</a>;
};

const Services = () => {
	const services = useStaticQuery(graphql`
		query {
			allMdx(filter: { slug: { glob: "pages/services/*" } }) {
				nodes {
					fields {
						slug
					}
					frontmatter {
						title
						featuredImage {
							childImageSharp {
								fluid(maxWidth: 400) {
									...GatsbyImageSharpFluid
								}
							}
						}	
					}
				}
			}
		}
	`).allMdx.nodes;

	console.log(services);

	return (
		<div className="Services">
			{services.map((service, i) => (
				<Service service={service} key={i} />
			))}
		</div>
	);
};

export default Services;
