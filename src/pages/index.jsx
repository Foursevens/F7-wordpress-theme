import { graphql } from 'gatsby';
import { Link } from 'gatsby-plugin-intl';
import React from 'react';

import CasesGridList from '../cases/grid-list';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PostsGridList from '../posts/grid-list';
import MembersGridList from '../members/grid-list';

import styles from './index.module.css';

export const query = graphql`
  query IndexQuery($language: String!) {
    homeIntro: wordpressPage(
      language: { eq: $language }
      title: { eq: "Home" }
    ) {
      content
    }
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
      filter: { language: { eq: $language }, status: { eq: "publish" } }
      limit: 6
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...CaseBaseData
        fields {
          remote_thumbnail_image {
            childImageSharp {
              fluid(maxWidth: 350) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    firstMembers: allWordpressWpMembers(
      filter: { language: { eq: $language }, status: { eq: "publish" } }
      limit: 3
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...MemberData
      }
    }
    firstPosts: allWordpressPost(
      filter: { language: { eq: $language }, status: { eq: "publish" } }
      limit: 6
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...PostBaseData
        fields {
          remote_thumbnail_image {
            childImageSharp {
              fluid(maxWidth: 350) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

export default function IndexPage({
  data: {
    homeIntro,
    allApproaches: { nodes: allApproaches },
    firstCases: { nodes: firstCases },
    firstMembers: { nodes: firstMembers },
    firstPosts: { nodes: firstPosts },
  },
}) {
  return (
    <Layout showHero>
      <SEO title="Home" />
      <div
        className="font-bold font-title mb-6 text-center text-3xl uppercase"
        aria-hidden="true"
      >
        Foursevens
      </div>
      <div
        className={styles.intro}
        dangerouslySetInnerHTML={{ __html: homeIntro.content }}
      />
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
      <h2>
        <Link to="/team">Team</Link>
      </h2>
      <MembersGridList members={firstMembers} />
      <h2>
        <Link to="/blog">Blog</Link>
      </h2>
      <PostsGridList posts={firstPosts} />
    </Layout>
  );
}
