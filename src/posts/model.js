import { graphql } from 'gatsby';
import { string, shape } from 'prop-types';

export const PostBaseData = graphql`
  fragment PostBaseData on wordpress__POST {
    id
    date
    hero_image
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
  hero_image: string,
  intro: string,
  language: string,
  slug: string,
  tags: shape({ name: string }),
  title: string,
};
