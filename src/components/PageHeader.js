import BackgroundImage from "gatsby-background-image";
import PropTypes from "prop-types";
import React from "react";
import Content from "./Content";
import "./PageHeader.css";
import { Breadcrumb } from "gatsby-plugin-breadcrumb";

const PageHeaderInner = ({ title, subtitle, breadcrumbs, pageContext }) => {
	const crumbs = pageContext?.breadcrumb?.crumbs;

	return (
		<div className="PageHeader--Inner">
			<div className="container relative">
				<div className="flex">
					<div>
						<h1 className="PageHeader--Title">{title}</h1>
						{subtitle && (
							<Content className="PageHeader--Subtitle" src={subtitle} />
						)}
					</div>
					{breadcrumbs && crumbs && (
						<div className="Breadcrumbs">
							<Breadcrumb
								crumbs={crumbs}
								crumbSeparator=" / "
								crumbLabel={title}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const PageHeader = ({
	title,
	subtitle,
	backgroundImage,
	pageContext,
	breadcrumbs,
	large,
	small,
	className = ""
}) => {
	if (large) {
		className += " PageHeader-large";
	} else if (small) {
		className += " PageHeader-small";
	}
	return (
		<div className={`PageHeader relative ${className}`}>
			{backgroundImage ? (
				<BackgroundImage
					fluid={backgroundImage.childImageSharp.fluid}
					size="cover"
				>
					<PageHeaderInner
						title={title}
						subtitle={subtitle}
						pageContext={pageContext}
						breadcrumbs={breadcrumbs}
					/>
				</BackgroundImage>
			) : (
				<PageHeaderInner
					title={title}
					subtitle={subtitle}
					pageContext={pageContext}
				/>
			)}
		</div>
	);
};

PageHeader.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string
};

export default PageHeader;
