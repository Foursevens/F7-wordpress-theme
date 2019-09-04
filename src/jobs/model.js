import { graphql } from 'gatsby';
import { string } from 'prop-types';

export const jobFragment = graphql`
  fragment JobBaseData on wordpress__wp_jobs {
    required_languages
    required_skill_level
    slug
    title
  }
`;

export const jobShape = {
  required_languages: string,
  required_skill_level: string,
  slug: string,
  title: string,
};
