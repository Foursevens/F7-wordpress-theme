import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => {
  const {
    allWordpressWpApproach: { nodes: approaches },
  } = useStaticQuery(graphql`
    query IndexQuery {
      allWordpressWpApproach(filter: { status: { eq: "publish" } }) {
        nodes {
          approach_intro
          title
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Home" />
      <h2>Approach</h2>
      <ul>
        {approaches.map((approach) => (
          <li>
            <h3>{approach.title}</h3>
            <p>{approach.approach_intro}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;
