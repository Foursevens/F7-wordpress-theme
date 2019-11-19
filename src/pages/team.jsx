import { graphql } from 'gatsby';
import React from 'react';

import { SEO } from '../components';
import { ContentLayout, MainLayout } from '../layout';
import MembersGridList from '../members/grid-list';
import { locationShape } from '../model';

export const query = graphql`
  query($language: String!) {
    allMembers: allWordpressWpMembers(filter: { language: { eq: $language } }) {
      nodes {
        ...MemberData
      }
    }
  }
`;

export default function TeamPage({
  data: {
    allMembers: { nodes: allMembers },
  },
  location,
}) {
  return (
    <MainLayout>
      <SEO pathname={location.pathname} title="Team" />
      <ContentLayout title="Team">
        <MembersGridList members={allMembers} />
      </ContentLayout>
    </MainLayout>
  );
}

TeamPage.propTypes = {
  location: locationShape.isRequired,
};
