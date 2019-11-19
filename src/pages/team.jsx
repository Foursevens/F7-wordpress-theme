import { graphql } from 'gatsby';
import React from 'react';

import { Container, SEO, Title } from '../components';
import { MainLayout } from '../layout';
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
      <Container>
        <Title as="h1" className="text-5xl">
          Team
        </Title>
        <MembersGridList members={allMembers} />
      </Container>
    </MainLayout>
  );
}

TeamPage.propTypes = {
  location: locationShape.isRequired,
};
