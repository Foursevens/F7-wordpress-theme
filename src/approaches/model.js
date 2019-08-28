import { graphql } from 'gatsby';
import { string } from 'prop-types';

export const approachFragment = graphql`
  fragment ApproachData on wordpress__wp_approach {
    id
    title
    approach_text
  }
`;

export const approachShape = {
  id: string,
  title: string,
  approach_text: string,
};
