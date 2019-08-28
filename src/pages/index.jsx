import { graphql } from 'gatsby';
import { Link } from 'gatsby-plugin-intl';
import React from 'react';

import CasesGridList from '../cases/grid-list';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PostsGridList from '../posts/grid-list';
import MembersGridList from '../members/grid-list';

export const query = graphql`
  query IndexQuery($language: String!) {
    allApproaches: allWordpressWpApproach(
      filter: { status: { eq: "publish" }, language: { eq: $language } }
    ) {
      nodes {
        id
        approach_intro
        title
      }
    }
    firstCases: allWordpressWpCases(
      filter: { language: { eq: $language } }
      limit: 6
    ) {
      nodes {
        ...CaseData
      }
    }
    firstMembers: allWordpressWpMembers(
      filter: { status: { eq: "publish" }, language: { eq: $language } }
      limit: 3
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...MemberData
      }
    }
    firstPosts: allWordpressPost(
      filter: { status: { eq: "publish" }, language: { eq: $language } }
      limit: 6
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...PostData
      }
    }
  }
`;

export default function IndexPage({
  data: {
    allApproaches: { nodes: allApproaches },
    firstCases: { nodes: firstCases },
    firstMembers: { nodes: firstMembers },
    firstPosts: { nodes: firstPosts },
  },
}) {
  return (
    <Layout>
      <SEO title="Home" />
      <h2>
        <Link to="/approach">Approach</Link>
      </h2>
      <ul>
        {allApproaches.map((approach) => (
          <li key={approach.id}>
            <h3>{approach.title}</h3>
            <p>{approach.approach_intro}</p>
          </li>
        ))}
      </ul>
      <h2>
        <Link to="/cases">Cases</Link>
      </h2>
      <CasesGridList cases={firstCases} />
      <h2>Team</h2>
      <MembersGridList members={firstMembers} />
      <h2>
        <Link to="/blog">Blog</Link>
      </h2>
      <PostsGridList posts={firstPosts} />
    </Layout>
  );
}
