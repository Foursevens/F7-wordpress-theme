import { graphql } from 'gatsby';
import { string, shape } from 'prop-types';

import { imageModel } from '../model';

export const memberFragment = graphql`
  fragment MemberData on wordpress__wp_members {
    id
    fields {
      remotePortret {
        childImageSharp {
          fluid(maxWidth: 257) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    function
    skills
    title
  }
`;

export const memberShape = {
  id: string,
  fields: shape({ remotePortret: imageModel }),
  title: string,
  function: string,
};
