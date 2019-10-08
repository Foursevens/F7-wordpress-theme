import { graphql } from 'gatsby';
import React from 'react';

import { Container, Layout, SEO, Title } from '../components';
import MembersGridList from '../members/grid-list';

export const query = graphql`
  query($language: String!) {
    allMembers: allWordpressWpMembers(filter: { language: { eq: $language } }) {
      nodes {
        ...MemberData
      }
    }
  }
`;

export default function MemberPage({
  data: {
    allMembers: { nodes: allMembers },
  },
}) {
  return (
    <Layout>
      <SEO title="Team" />
      <Container>
        <Title as="h1" className="text-5xl">
          Team
        </Title>
        <MembersGridList members={allMembers} />
      </Container>
    </Layout>
  );
}
