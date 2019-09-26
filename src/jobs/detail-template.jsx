import { graphql } from 'gatsby';
import { Link } from 'gatsby-plugin-intl';
import React from 'react';

import { Layout } from '../components';

export const query = graphql`
  query($language: String!, $slug: String!) {
    jobDetail: wordpressWpJobs(
      language: { eq: $language }
      slug: { eq: $slug }
    ) {
      ...JobBaseData
      content
    }
  }
`;

export default function JobDetailTemplate({
  data: {
    jobDetail: { title, content },
  },
}) {
  return (
    <Layout>
      <Link to="/jobs">Jobs</Link>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}
