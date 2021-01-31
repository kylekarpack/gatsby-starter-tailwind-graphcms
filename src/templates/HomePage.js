import React from "react";
import { graphql } from "gatsby";
import { Carousel } from "react-responsive-carousel";
import Content from "../components/Content";
import Layout from "../components/Layout";
import "react-responsive-carousel/lib/styles/carousel.css";
import "./HomePage.css";

// Export Template for use in CMS preview
export const HomePageTemplate = ({ subtitle, images, body }) => {
	return (
		<main className="Home">
			<div className="relative">
				<div className="absolute hidden sm:block text-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-6 text-white font-bold bg-black bg-opacity-60 max-w-1/2 z-10">
					<h1 className="m-0" dangerouslySetInnerHTML={{__html: subtitle}}></h1>
				</div>
			<Carousel
				interval={5000}
				showThumbs={false}
				showArrows={true}
				showIndicators={false}
				showStatus={false}
				useKeyboardArrows={true}
				infiniteLoop={true}
				autoPlay={true}
				dynamicHeight={true}
			>
				{images.map((img, i) => (
					<div key={i} style={{maxHeight:"65vh", minHeight: "200px"}}>
						<img src={img?.url?.childImageSharp?.fluid?.src} />
						<p className="legend">{img.description}</p>
					</div>
				))}
			</Carousel>
			</div>

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
		page: graphCmsPage(id: { eq: $id }) {
			title
			#...Meta
			# body
			# frontmatter {
			# 	title
			# 	subtitle
			# 	images {
			# 		description
			# 		url {
			# 			childImageSharp {
			# 				fluid(maxWidth: 1920) {
			# 					...GatsbyImageSharpFluid
			# 				}
			# 			}
			# 		}
			# 	}
			# }
		}
	}
`;
