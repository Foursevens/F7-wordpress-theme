import { graphql } from 'gatsby';
import { object, string, shape } from 'prop-types';

export const caseFragment = graphql`
  fragment CaseBaseData on wordpress__wp_cases {
    id
    fields {
      remote_thumbnail_image {
        childImageSharp {
          fluid(maxWidth: 768) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    sections {
      name
    }
    slug
    technologies {
      name
    }
    thumbnail_image {
      alt
    }
    title
  }
`;

export const caseShape = {
  id: string,
  fields: shape({ remote_thumbnail_image: shape({ childImageSharp: object }) }),
  sections: shape({ name: string }),
  technologies: shape({ name: string }),
  thumbnail_image: shape({ alt: string }),
  slug: string,
  title: string,
};
