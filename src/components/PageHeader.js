import PropTypes from "prop-types";
import React from "react";
import Content from "./Content";
import Image from "./Image";
import "./PageHeader.css";

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
			{backgroundImage && (
				<Image
					background
					resolutions="large"
					src={backgroundImage}
					alt={title}
					size="cover"
				/>
			)}
			<div className="container relative">
				<h1 className="PageHeader--Title">{title}</h1>
				{subtitle && (
					<Content className="PageHeader--Subtitle" src={subtitle} />
				)}
			</div>
		</div>
	);
};

PageHeader.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string
};

export default PageHeader;
