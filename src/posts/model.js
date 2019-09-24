import { graphql } from 'gatsby';
import { arrayOf, object, string, shape } from 'prop-types';

export const PostBaseData = graphql`
  fragment PostBaseData on wordpress__POST {
    id
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
        name
      }
    }
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
  id: string,
  category: shape({ name: string }),
  date: string,
  fields: shape({
    remote_hero_image: shape({ childImageSharp: object, name: string }),
  }),
  intro: string,
  language: string,
  slug: string,
  tags: arrayOf(shape({ name: string })),
  title: string,
};
