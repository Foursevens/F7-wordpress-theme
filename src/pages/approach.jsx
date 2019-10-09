import { graphql } from 'gatsby';
import React from 'react';

import { Container, Layout, SEO, Title } from '../components';
import ApproachesGridList from '../approaches/grid-list';

export const query = graphql`
  query($language: String!) {
    allApproaches: allWordpressWpApproach(
      filter: { language: { eq: $language } }
    ) {
      nodes {
        ...ApproachData
        approach_text
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
        <Title as="h1" className="text-5xl">
          Approach
        </Title>
        <ApproachesGridList approaches={allApproaches} />
      </Container>
    </Layout>
  );
}
