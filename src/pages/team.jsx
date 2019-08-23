import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
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
      <MembersGridList members={allMembers} />
    </Layout>
  );
}
