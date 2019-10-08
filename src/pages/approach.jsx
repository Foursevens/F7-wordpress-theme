import { graphql } from 'gatsby';
import React from 'react';

import { Container, Layout, SEO } from '../components';
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
      <Container>
        <ApproachesGridList approaches={allApproaches} />
      </Container>
    </Layout>
  );
}
