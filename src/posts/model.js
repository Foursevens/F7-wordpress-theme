import { graphql } from 'gatsby';
import { string, shape } from 'prop-types';

export const PostBaseData = graphql`
  fragment PostBaseData on wordpress__POST {
    id
    date
    hero_image
    intro
    language
    path
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
  path: string,
  tags: shape({ name: string }),
  title: string,
};
