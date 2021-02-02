import { graphql } from "gatsby";

export const query = graphql`
	fragment image on GraphCMS_Asset {
		localFile {
			childImageSharp {
				fluid(maxWidth: 400) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
	fragment imageWide on GraphCMS_Asset {
		localFile {
			childImageSharp {
				fluid(maxWidth: 960) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
`;
