import BackgroundImage from "gatsby-background-image";
import PropTypes from "prop-types";
import React from "react";
import Content from "./Content";
import "./PageHeader.css";

const PageHeaderInner = ({ title, subtitle }) => (
	<div className="PageHeader--Inner">
		<div className="container relative">
			<h1 className="PageHeader--Title">{title}</h1>
			{subtitle && (
				<Content className="PageHeader--Subtitle" src={subtitle} />
			)}
		</div>
	</div>
);

const PageHeader = ({
	title,
	subtitle,
	backgroundImage,
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
					<PageHeaderInner title={title} subtitle={subtitle} />
				</BackgroundImage>
			) : (
				<PageHeaderInner title={title} subtitle={subtitle} />
			)}
		</div>
	);
};

PageHeader.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string
};

export default PageHeader;
