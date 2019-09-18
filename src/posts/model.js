import { graphql } from 'gatsby';
import { arrayOf, string, shape } from 'prop-types';

export const PostBaseData = graphql`
  fragment PostBaseData on wordpress__POST {
    category {
      name
    }
    date
    fields {
      remote_hero_image {
        childImageSharp {
          fluid(maxWidth: 768) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    id
    intro
    language
    slug
    tags {
      name
    }
    title
  }
`;

export const postShape = {
  category: shape({ name: string }),
  date: string,
  fields: shape({ remote_hero_image: shape({}) }),
  id: string,
  intro: string,
  language: string,
  slug: string,
  tags: arrayOf(shape({ name: string })),
  title: string,
};
