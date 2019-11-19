import { graphql } from 'gatsby';
import { string } from 'prop-types';

export const jobFragment = graphql`
  fragment JobBaseData on wordpress__wp_jobs {
    id
    requiredLanguages
    requiredSkillLevel
    slug
    title
  }
`;

export const jobShape = {
  id: string,
  requiredLanguages: string,
  requiredSkillLevel: string,
  slug: string,
  title: string,
};
