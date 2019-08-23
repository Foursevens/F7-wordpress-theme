import { graphql } from 'gatsby';
import { string, shape, number } from 'prop-types';

export const memberFragment = graphql`
  fragment MemberData on wordpress__wp_members {
    id
    title
    portret {
      childImageSharp {
        fluid(maxWidth: 257) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    function
  }
`;

export const memberShape = {
  id: string,
  title: string,
  portret: shape({
    childImageSharp: shape({
      fluid: shape({
        aspectRatio: number,
        base64: string,
        sizes: string,
        src: string,
        srcSet: string,
      }),
    }),
  }),
  function: string,
};
