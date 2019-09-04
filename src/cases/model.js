import { graphql } from 'gatsby';
import { string, shape } from 'prop-types';

export const caseFragment = graphql`
  fragment CaseBaseData on wordpress__wp_cases {
    id
    path
    sections {
      name
    }
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
  path: string,
  sections: shape({ name: string }),
  technologies: shape({ name: string }),
  thumbnail_image: shape({ url: string }),
  title: string,
};
