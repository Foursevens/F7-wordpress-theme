import { graphql } from 'gatsby';
import { object, string, shape } from 'prop-types';

export const memberFragment = graphql`
  fragment MemberData on wordpress__wp_members {
    id
    title
    fields {
      remote_portret {
        childImageSharp {
          fluid(maxWidth: 257) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    function
  }
`;

export const memberShape = {
  id: string,
  fields: shape({ remote_portret: shape({ childImageSharp: object }) }),
  title: string,
  function: string,
};
