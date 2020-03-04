import { graphql } from 'gatsby';
import { string, shape } from 'prop-types';

export const caseFragment = graphql`
  fragment CaseBaseData on wordpress__wp_cases {
    id
    customerName
    sections {
      name
      slug
    }
    slug
    technologies {
      name
    }
    thumbnailImage {
      alt
    }
    title
  }
`;

export const caseShape = {
  id: string,
  sections: shape({ name: string, slug: string }),
  technologies: shape({ name: string }),
  thumbnailImage: shape({ alt: string }),
  slug: string,
  title: string,
};
