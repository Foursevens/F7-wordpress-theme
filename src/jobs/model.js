import { graphql } from 'gatsby';
import { string } from 'prop-types';

export const jobFragment = graphql`
  fragment JobData on wordpress__wp_jobs {
    content
    required_languages
    required_skill_level
    slug
    title
  }
`;

export const jobShape = {
  title: string,
  required_languages: string,
  required_skill_level: string,
  content: string,
};
