import { graphql } from 'gatsby';
import React, { useState } from 'react';

import '../components/layout.css';

import CasesGridList from '../cases/grid-list';
import Layout from '../components/layout';
import SEO from '../components/seo';

export const query = graphql`
  query($language: String!) {
    allCases: allWordpressWpCases(filter: { language: { eq: $language } }) {
      nodes {
        ...CaseBaseData
      }
    }
    allSections: allWordpressWpSections {
      nodes {
        id
        name
      }
    }
  }
`;

export default function CasesPage({
  data: {
    allCases: { nodes: allCases },
    allSections: { nodes: allSections },
  },
}) {
  const [sectionFilter, setSectionFilter] = useState({});
  function toggleSection(name) {
    setSectionFilter({
      ...sectionFilter,
      [name]: !sectionFilter[name],
    });
  }
  const selectedSections =
    sectionFilter == null
      ? null
      : Object.entries(sectionFilter)
          .filter(([, value]) => value !== false)
          .map(([key]) => key);
  return (
    <Layout>
      <SEO title="Cases" />
      <div>
        <h3>Cases</h3>
        <ul>
          {allSections.map(({ id, name }) => (
            <li
              style={{
                'font-weight': selectedSections.includes(name)
                  ? 'bold'
                  : 'normal',
              }}
              key={id}
              onClick={() => toggleSection(name)}
            >
              {name}
            </li>
          ))}
        </ul>
        <CasesGridList selectedSections={selectedSections} cases={allCases} />
      </div>
    </Layout>
  );
}
