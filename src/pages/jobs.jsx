import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import JobsGridList from '../jobs/grid-list';

export const query = graphql`
  query($language: String!) {
    allJobs: allWordpressWpJobs(filter: { language: { eq: $language } }) {
      nodes {
        ...JobData
      }
    }
  }
`;

export default function JobsPage({
  data: {
    allJobs: { nodes: allJobs },
  },
}) {
  return (
    <Layout>
      <SEO title="Jobs" />
      <h3>Jobs</h3>
      <JobsGridList jobs={allJobs} />
    </Layout>
  );
}
