import { graphql } from "gatsby";
import React from "react";
import { Mail, MapPin, Smartphone } from "react-feather";
import FormSimpleAjax from "../components/FormSimpleAjax";
import Layout from "../components/Layout";
import Map from "../components/Map";
import PageHeader from "../components/PageHeader";
import "./ContactPage.css";

const ContactPage = ({ data: { page } }) => {
	const {
		title,
		subtitle,
		image,
		attributes: {
			properties: { address, phone, email, locations }
		}
	} = page;
	const addressLink = `https://www.google.com/maps/search/${encodeURI(
		address
	)}`;

	return (
		<Layout title={page.title || false}>
			<main className="Contact">
				<PageHeader
					title={title}
					subtitle={subtitle}
					backgroundImage={image?.localFile}
					small={true}
				/>
				<section className="section">
					<div className="container">
						<div className="col-span-2">
							<div
								className="body-content"
								dangerouslySetInnerHTML={{ __html: page.content?.html }}
							></div>{" "}
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
					</div>

					<div className="container">
						<FormSimpleAjax name="Contact Us" />
					</div>
				</section>

				{locations && locations[0] && <Map locations={locations[0]} />}
			</main>
		</Layout>
	);
};

export default ContactPage;

export const pageQuery = graphql`
	query ContactPage($id: String!) {
		page: graphCmsPage(id: { eq: $id }) {
			title
			subtitle
			content {
				html
			}
			image {
				...imageWide
			}
			attributes
		}
	}
`;
