import BackgroundImage from "gatsby-background-image";
import { Breadcrumb } from "gatsby-plugin-breadcrumb";
import PropTypes from "prop-types";
import React from "react";
import "./PageHeader.css";

const PageHeaderInner = ({
	title,
	subtitle,
	breadcrumbs,
	pageContext,
	className
}) => {
	const crumbs = pageContext?.breadcrumb?.crumbs;

	return (
		<div className={`bg-black bg-opacity-50 ${className}`}>
			<div className="container relative animate-fade-in">
				<div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-center text-white">
					<div
						className={
							breadcrumbs && crumbs ? "col-span-1" : "col-span-2"
						}
					>
						<h1 className="text-4xl font-bold m-0">{title}</h1>
						{subtitle && (
							<div
								className="text-xl"
								dangerouslySetInnerHTML={{ __html: subtitle }}
							></div>
						)}
					</div>
					{breadcrumbs && crumbs && (
						<div className="Breadcrumbs hidden md:block mt-4 lg:mt-0 lg:text-right">
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
	style,
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
					style={style}
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
