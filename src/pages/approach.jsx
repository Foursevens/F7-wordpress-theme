import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ApproachesGridList from '../approaches/grid-list';

export const query = graphql`
  query($language: String!) {
    allApproaches: allWordpressWpApproach(
      filter: { language: { eq: $language } }
    ) {
      nodes {
        ...ApproachData
      }
    }
  }
`;

export default function ApproachPage({
  data: {
    allApproaches: { nodes: allApproaches },
  },
}) {
  return (
    <Layout>
      <SEO title="Approach" />
      <ApproachesGridList approaches={allApproaches} />
    </Layout>
  );
}
