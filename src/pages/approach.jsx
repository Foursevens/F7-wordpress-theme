import { graphql } from 'gatsby';
import React from 'react';

import { Container, Layout, SEO, Title } from '../components';
import ApproachesGridList from '../approaches/grid-list';
import { locationShape } from '../model';

export const query = graphql`
  query($language: String!) {
    allApproaches: allWordpressWpApproach(
      filter: { language: { eq: $language } }
      sort: { fields: menu_order }
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
  location,
}) {
  return (
    <Layout>
      <SEO pathname={location.pathname} title="Approach" />
      <Container>
        <Title as="h1" className="text-5xl">
          Approach
        </Title>
        <ApproachesGridList approaches={allApproaches} />
      </Container>
    </Layout>
  );
}

ApproachPage.propTypes = {
  location: locationShape.isRequired,
};
