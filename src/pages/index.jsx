import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

import CasesGridList from '../cases/grid-list';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PostsGridList from '../posts/grid-list';

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
        id
        portret {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        function
        skills
        title
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

export default function IndexPage({ data }) {
  const {
    allApproaches: { nodes: allApproaches },
    firstCases: { nodes: firstCases },
    firstMembers: { nodes: firstMembers },
    firstPosts: { nodes: firstPosts },
  } = data;
  return (
    <Layout>
      <SEO title="Home" />
      <h2>Approach</h2>
      <ul>
        {allApproaches.map((approach) => (
          <li key={approach.id}>
            <h3>{approach.title}</h3>
            <p>{approach.approach_intro}</p>
          </li>
        ))}
      </ul>
      <h2>Cases</h2>
      <CasesGridList cases={firstCases} />
      <h2>Team</h2>
      <ul style={{ display: 'flex' }}>
        {firstMembers.map((member) => (
          <li key={member.id}>
            <h3>{member.title}</h3>
            <Img fluid={member.portret.childImageSharp.fluid} />
            <sub>{member.function}</sub>
          </li>
        ))}
      </ul>
      <ul>
        <h2>blog</h2>
        <PostsGridList posts={firstPosts} />
      </ul>
    </Layout>
  );
}
