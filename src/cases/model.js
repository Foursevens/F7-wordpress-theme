import { graphql } from 'gatsby';
import { string, shape } from 'prop-types';

export const caseFragment = graphql`
  fragment CaseBaseData on wordpress__wp_cases {
    id
    sections {
      name
    }
    slug
    technologies {
      name
    }
    thumbnail_image {
      alt
      url
    }
    title
  }
`;

export const caseShape = {
  id: string,
  sections: shape({ name: string }),
  technologies: shape({ name: string }),
  thumbnail_image: shape({ url: string }),
  slug: string,
  title: string,
};
