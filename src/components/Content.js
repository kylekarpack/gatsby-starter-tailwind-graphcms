import { MDXRenderer } from "gatsby-plugin-mdx";
import PropTypes from "prop-types";
import React from "react";
import "./Content.css";

const Content = ({ source, src }) => {
	// accepts either html or markdown
	if (src) {
		return src;
	}
	return <MDXRenderer>{source}</MDXRenderer>;
};

Content.propTypes = {
	source: PropTypes.string,
	src: PropTypes.string,
	className: PropTypes.string
};

export default Content;
