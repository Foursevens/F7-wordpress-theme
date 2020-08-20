import { graphql } from 'gatsby';
import { string, shape } from 'prop-types';

export const PostBaseData = graphql`
  fragment PostBaseData on wordpress__POST {
    id
    date
    fields {
      remoteThumbnailImage {
        childImageSharp {
          fluid(maxWidth: 350) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    intro
    language
    slug
    tag {
      name
      slug
    }
    thumbnailImage {
      alt
    }
    title
  }
`;

export const postShape = {
  id: string,
  date: string,
  intro: string,
  language: string,
  slug: string,
  tag: shape({ name: string, slug: string }),
  thumbnailImage: shape({ alt: string }),
  title: string,
};
