import { string, shape } from 'prop-types';

export const blogPostShape = {
  id: string,
  date: string,
  hero_image: string,
  intro: string,
  language: string,
  path: string,
  tags: shape({ name: string }),
  title: string,
};

export const caseShape = {
  id: string,
  title: string,
  path: string,
  sections: shape({ name: string }),
  technologies: shape({ name: string }),
  thumbnail_image: shape({ url: string }),
};
