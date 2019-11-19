import { graphql } from 'gatsby';
import { shape, string } from 'prop-types';

import { imageModel } from '../model';

export const approachFragment = graphql`
  fragment ApproachData on wordpress__wp_approach {
    id
    fields {
      remote_image {
        childImageSharp {
          fixed(width: 130) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
    image {
      alt
    }
    title
  }
`;

export const approachShape = {
  id: string,
  fields: shape({ remote_image: imageModel }),
  image: shape({ alt: string }),
  title: string,
};
