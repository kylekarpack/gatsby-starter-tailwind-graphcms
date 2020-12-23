import "./ContactPage.css";

import { Mail, MapPin, Smartphone } from "react-feather";

import Content from "../components/Content";
import FormSimpleAjax from "../components/FormSimpleAjax";
import FileMail from "../components/FileMail";
import Layout from "../components/Layout";
import Map from "../components/Map";
import PageHeader from "../components/PageHeader";
import React from "react";
import { graphql } from "gatsby";

// Export Template for use in CMS preview
export const ContactPageTemplate = ({
	body,
	title,
	subtitle,
	featuredImage,
	address,
	phone,
	email,
	locations
}) => {
	const addressLink = `https://www.google.com/maps/search/${encodeURI(
		address
	)}`;

	return (
		<main className="Contact">
			<PageHeader
				title={title}
				subtitle={subtitle}
				backgroundImage={featuredImage}
			/>
			<section className="section">
				<div className="container max-w-screen-lg grid lg:grid-cols-3 gap-12">
					<div className="col-span-2">
						<Content source={body} />
						<div className="Contact--Details">
							{address && (
								<a
									className="Contact--Details--Item"
									href={addressLink}
									target="_blank"
									rel="noopener noreferrer"
								>
									<MapPin /> {address}
								</a>
							)}
							{phone && (
								<a
									className="Contact--Details--Item"
									href={`tel:${phone}`}
								>
									<Smartphone /> {phone}
								</a>
							)}
							{email && (
								<a href={`mailto:${email}`}>
									<Mail />
									{email}
								</a>
							)}
						</div>
					</div>

					<div className="col-span-2 lg:col-span-1">
						<h2>Send Us Files</h2>
						<FileMail companyId={6052147275} />
						{/* <br />
						<h2>Contact Us</h2>
						<FormSimpleAjax name="Contact Us" /> */}
					</div>
				</div>
			</section>

			{locations && locations[0] && <Map locations={locations[0]} />}
		</main>
	);
};

const ContactPage = ({ data: { page } }) => (
	<Layout
		meta={page.frontmatter.meta || false}
		title={page.frontmatter.title || false}
	>
		<ContactPageTemplate {...page.frontmatter} body={page.body} />
	</Layout>
);

export default ContactPage;

export const pageQuery = graphql`
	query ContactPage($id: String!) {
		page: mdx(id: { eq: $id }) {
			...Meta
			body
			frontmatter {
				title
				template
				subtitle
				featuredImage {
					childImageSharp {
						fluid(maxHeight: 500, maxWidth: 960, cropFocus: NORTH) {
							...GatsbyImageSharpFluid
						}
					}
				}
				address
				phone
				email
				locations {
					mapLink
					lat
					lng
				}
			}
		}
	}
`;
