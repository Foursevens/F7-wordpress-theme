import { graphql } from 'gatsby';
import { string } from 'prop-types';

export const jobFragment = graphql`
  fragment JobData on wordpress__wp_jobs {
    title
    content
  }
`;

export const jobShape = {
  title: string,
  content: string,
};
