import { graphql } from 'gatsby';
import { string } from 'prop-types';

export const approachFragment = graphql`
  fragment ApproachData on wordpress__wp_approach {
    id
    approach_text
    title
  }
`;

export const approachShape = {
  id: string,
  approach_text: string,
  title: string,
};
