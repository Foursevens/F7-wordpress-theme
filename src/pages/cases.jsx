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
    allSections: allWordpressWpSections(
      filter: { language: { eq: $language } }
    ) {
      nodes {
        language
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
      <div className="text-center">
        <h3>Cases</h3>
        <ul className="flex justify-center">
          {allSections.map(({ id, name }) => (
            <li
              className={`mx-2 ${
                selectedSections.includes(name) ? 'focus: text-f7500' : null
              }`}
              key={id}
              onClick={() => toggleSection(name)}
              onKeyPress={(event) => {
                if (event.charCode === 13) {
                  event.preventDefault();
                  toggleSection(name);
                }
              }}
              role="link"
              tabIndex="0"
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
