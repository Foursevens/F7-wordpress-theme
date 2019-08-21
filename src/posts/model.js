import { graphql } from 'gatsby';
import { string, shape } from 'prop-types';

export const postFragment = graphql`
  fragment PostData on wordpress__POST {
    id
    content
    date
    hero_image
    intro
    language
    path
    tags {
      name
    }
    title
    video
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
  video: string,
};
