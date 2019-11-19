import { graphql } from 'gatsby';
import React from 'react';

import { Container, SEO, Title } from '../components';
import { MainLayout } from '../layout';
import ApproachesGridList from '../approaches/grid-list';
import { locationShape } from '../model';

export const query = graphql`
  query($language: String!) {
    allApproaches: allWordpressWpApproach(
      filter: { language: { eq: $language } }
      sort: { fields: menuOrder }
    ) {
      nodes {
        ...ApproachData
        approachText
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
    <MainLayout>
      <SEO pathname={location.pathname} title="Approach" />
      <Container>
        <Title as="h1" className="text-5xl">
          Approach
        </Title>
        <ApproachesGridList approaches={allApproaches} />
      </Container>
    </MainLayout>
  );
}

ApproachPage.propTypes = {
  location: locationShape.isRequired,
};
