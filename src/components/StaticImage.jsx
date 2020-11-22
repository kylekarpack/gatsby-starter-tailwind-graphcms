import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import BackgroundImage from "gatsby-background-image";
import React, { useMemo } from "react";

export const StaticImage = ({ src, alt, background, ...props }) => {
	const data = useStaticQuery(graphql`
		query LogoQuery {
			allFile(
				filter: { extension: { in: ["jpg", "jpeg", "png", "webp"] } }
			) {
				nodes {
					relativePath
					childImageSharp {
						fluid(maxWidth: 400) {
							...GatsbyImageSharpFluid_withWebp_noBase64
						}
					}
				}
			}
		}
	`);

	const match = useMemo(
		() => data.allFile.nodes.find(({ relativePath }) => src === relativePath),
		[data, src]
	);

	if (!match) {
		throw `Image "${src} not found!`;
	}

	if (background) {
		return (
			<BackgroundImage
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}}
				fluid={match.childImageSharp.fluid}
			/>
		);
	}

	return <Img fluid={match.childImageSharp.fluid} alt={alt} {...props} />;
};
