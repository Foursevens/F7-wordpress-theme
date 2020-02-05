import { graphql } from 'gatsby';
import React from 'react';

import { SEO } from '../components';
import { ContentLayout, Grid, MainLayout } from '../layout';
import { MemberCard, MemberCardApply } from '../members';
import { locationShape } from '../model';

export const query = graphql`
  query($language: String!) {
    allMembers: allWordpressWpMembers(
      filter: { language: { eq: $language }, status: { eq: "publish" } }
    ) {
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
        <Grid>
          {allMembers
            .map((member) => <MemberCard key={member.id} member={member} />)
            .concat(<MemberCardApply key="apply" />)}
        </Grid>
      </ContentLayout>
    </MainLayout>
  );
}

TeamPage.propTypes = {
  location: locationShape.isRequired,
};
