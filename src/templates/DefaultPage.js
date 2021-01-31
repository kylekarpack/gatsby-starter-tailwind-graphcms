import { graphql } from "gatsby";
import React from "react";
import Content from "../components/Content";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import PagePreview from "../components/PagePreview";
import Portfolio from "../components/Portfolio";

// Export Template for use in CMS Default
export const DefaultPageTemplate = (props) => {
	const preview = props.preview || {};
	return (
		<main className="DefaultPage">
			<PageHeader
				title={props.title}
				subtitle={props.subtitle}
				backgroundImage={props.featuredImage}
				pageContext={props.pageContext}
				breadcrumbs
				small={props.small}
			/>

			<section className="section">
				<div className="container main-content">
					<Content source={props.body} />
					{(preview.type || props.portfolioCategory) && <br />}
					{preview.type && <PagePreview {...preview} />}
					{props.portfolioCategory && (
						<Portfolio
							category={props.portfolioCategory}
							portfolioStyle={props.portfolioStyle}
							excerpt={true}
						/>
					)}
				</div>
			</section>
		</main>
	);
};

const DefaultPage = ({ pageContext, data: { page } }) => {
	console.log(page);
	return (
		<Layout
			meta={page.frontmatter.meta || false}
			title={page.frontmatter.title || false}
		>
			<DefaultPageTemplate
				pageContext={pageContext}
				{...page.frontmatter}
				body={page.body}
			/>
		</Layout>
	);
};
export default DefaultPage;

export const pageQuery = graphql`
	query DefaultPage($id: String!) {
		page: graphCmsPage(id: { eq: $id }) {
			id
			title
			slug
		}
	}
`;
