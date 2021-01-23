import React from "react";
import { graphql } from "gatsby";
import { Carousel } from "react-responsive-carousel";
import Content from "../components/Content";
import Layout from "../components/Layout";
import "react-responsive-carousel/lib/styles/carousel.css";
import "./HomePage.css";

// Export Template for use in CMS preview
export const HomePageTemplate = ({ images, body }) => {
	console.log(images);
	return (
		<main className="Home">
			<Carousel
				showArrows={true}
				useKeyboardArrows={true}
				infiniteLoop={true}
				autoPlay={true}
				dynamicHeight={true}
			>
				{images.map((img, i) => (
					<div key={i} style={{maxHeight:"50vh"}}>
						<img src={img?.url?.childImageSharp?.fluid?.src} />
						<p className="legend">{img.description}</p>
					</div>
				))}
			</Carousel>

			<section className="section">
				<div className="container">
					<Content source={body} />
				</div>
			</section>
		</main>
	);
};

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => (
	<Layout meta={page.frontmatter.meta || false}>
		<HomePageTemplate {...page} {...page.frontmatter} body={page.body} />
	</Layout>
);

export default HomePage;

export const pageQuery = graphql`
	## Query for HomePage data
	## Use GraphiQL interface (http://localhost:8000/___graphql)
	## $id is processed via gatsby-node.js
	## query name must be unique to this file
	query HomePage($id: String!) {
		page: mdx(id: { eq: $id }) {
			...Meta
			body
			frontmatter {
				title
				subtitle
				images {
					description
					url {
						childImageSharp {
							fluid(maxWidth: 1920) {
								...GatsbyImageSharpFluid
							}
						}
					}
				}
			}
		}
	}
`;
