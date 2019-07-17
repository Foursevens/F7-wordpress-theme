import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

export default function IndexPage() {
  const {
    approaches: { nodes: approaches },
    cases: { nodes: cases },
  } = useStaticQuery(graphql`
    query IndexQuery {
      approaches: allWordpressWpApproach(
        filter: { status: { eq: "publish" } }
      ) {
        nodes {
          id
          approach_intro
          title
        }
      }
      cases: allWordpressWpCases(
        filter: { status: { eq: "publish" } }
        limit: 6
        sort: { fields: date, order: DESC }
      ) {
        nodes {
          id
          path
          sections {
            name
          }
          title
          technologies {
            name
          }
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
          <li key={approach.id}>
            <h3>{approach.title}</h3>
            <p>{approach.approach_intro}</p>
          </li>
        ))}
      </ul>
      <h2>Cases</h2>
      <ul>
        {cases.map((wpCase) => (
          <li key={wpCase.id}>
            <h3>{wpCase.title}</h3>
            <p>
              <Link to={wpCase.path}>details</Link>
            </p>
            <sub>
              {wpCase.technologies.name} for {wpCase.sections.name}
            </sub>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
