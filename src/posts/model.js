import { graphql } from 'gatsby';
import { arrayOf, string, shape } from 'prop-types';

export const PostBaseData = graphql`
  fragment PostBaseData on wordpress__POST {
    id
    category {
      name
    }
    date
    intro
    language
    slug
    tags {
      name
    }
    thumbnailImage {
      alt
    }
    title
  }
`;

export const postShape = {
  id: string,
  category: shape({ name: string }),
  date: string,
  intro: string,
  language: string,
  slug: string,
  tags: arrayOf(shape({ name: string })),
  thumbnailImage: shape({ alt: string }),
  title: string,
};
