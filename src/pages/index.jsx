import { graphql } from 'gatsby';
import { injectIntl, intlShape, Link } from 'gatsby-plugin-intl';
import React from 'react';

import CasesGridList from '../cases/grid-list';
import { Hero, Layout, SEO, Title } from '../components';
import MembersGridList from '../members/grid-list';
import PostsGridList from '../posts/grid-list';

import styles from './index.module.css';

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
    hero: file(base: { eq: "hero.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    intro: wordpressPage(language: { eq: $language }, title: { eq: "Home" }) {
      content
    }
    metadata: wordpressSiteMetadata(language: { eq: $language }) {
      description
    }
  }
`;

function IndexPage({
  data: {
    allApproaches: { nodes: allApproaches },
    firstCases: { nodes: firstCases },
    firstMembers: { nodes: firstMembers },
    firstPosts: { nodes: firstPosts },
    hero,
    intro,
    metadata,
  },
  intl,
}) {
  return (
    <Layout
      hero={
        <Hero
          alt={intl.formatMessage({ id: 'index.hero-alt' })}
          colorize="bg-f7800"
          image={hero}
          position="top center"
        >
          <div className="mx-6 py-6 font-300 text-4xl text-right text-f7100">
            <span className="inline-block -mr-1 p-1 w-48">
              {metadata.description}
            </span>
          </div>
        </Hero>
      }
    >
      <SEO title="Home" />
      <Title aria-hidden="true" as="h1">
        Foursevens
      </Title>
      <div
        className={styles.intro}
        dangerouslySetInnerHTML={{ __html: intro.content }}
      />
      <Title>
        <Link to="/approach">Approach</Link>
      </Title>
      <ul>
        {allApproaches.map((approach) => (
          <li key={approach.id}>
            <h3>{approach.title}</h3>
            <p>{approach.approach_intro}</p>
          </li>
        ))}
      </ul>
      <Title>Cases</Title>
      <CasesGridList cases={firstCases} />
      <Title>Team</Title>
      <MembersGridList members={firstMembers} />
      <Title>Blog</Title>
      <PostsGridList posts={firstPosts} />
    </Layout>
  );
}

IndexPage.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(IndexPage);
