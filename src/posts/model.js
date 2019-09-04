import { graphql } from 'gatsby';
import { string, shape } from 'prop-types';

export const PostBaseData = graphql`
  fragment PostBaseData on wordpress__POST {
    id
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
  date: string,
  fields: shape({ remote_hero_image: shape({}) }),
  intro: string,
  language: string,
  slug: string,
  tags: shape({ name: string }),
  title: string,
};
