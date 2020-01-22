import { graphql } from 'gatsby';
import React from 'react';

import { SEO } from '../components';
import { ContentLayout, MainLayout } from '../layout';
import ApproachesGridList from '../approaches/grid-list';
import { locationShape } from '../model';

export const query = graphql`
  query($language: String!) {
    allApproaches: allWordpressWpApproach(
      filter: { language: { eq: $language }, status: { eq: "publish" } }
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
      <ContentLayout title="Approach">
        <ApproachesGridList approaches={allApproaches} />
      </ContentLayout>
    </MainLayout>
  );
}

ApproachPage.propTypes = {
  location: locationShape.isRequired,
};
