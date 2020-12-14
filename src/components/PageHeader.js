import "./PageHeader.css";

import BackgroundImage from "gatsby-background-image";
import { Breadcrumb } from "gatsby-plugin-breadcrumb";
import Content from "./Content";
import PropTypes from "prop-types";
import React from "react";

const PageHeaderInner = ({ title, subtitle, breadcrumbs, pageContext, className }) => {
	const crumbs = pageContext?.breadcrumb?.crumbs;

	return (
		<div className={`PageHeader--Inner ${className}`}>
			<div className="container relative">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-4xl font-bold m-0">{title}</h1>
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
		className += " py-36";
	} else if (small) {
		className += " py-20";
	} else {
		className += " py-32";
	}
	return (
		<div className={`PageHeader relative`}>
			{backgroundImage ? (
				<BackgroundImage
					fluid={backgroundImage.childImageSharp.fluid}
					size="cover"
				>
					<PageHeaderInner
						className={className}
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
