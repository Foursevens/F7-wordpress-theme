import { graphql } from 'gatsby';
import React, { useState } from 'react';

import CasesGridList from '../cases/grid-list';
import { SEO } from '../components';
import { ContentLayout, MainLayout } from '../layout';
import { locationShape } from '../model';

export const query = graphql`
  query($language: String!) {
    allCases: allWordpressWpCases(
      filter: { language: { eq: $language }, status: { eq: "publish" } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...CaseBaseData
        fields {
          remoteThumbnailImage {
            childImageSharp {
              fluid(maxWidth: 350) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
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
  location,
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
    <MainLayout>
      <SEO pathname={location.pathname} title="Cases" />
      <ContentLayout title="Cases">
        <ul className="text-center mb-8">
          {allSections.map(({ id, name }) => (
            <li
              key={id}
              className={`inline cursor-pointer select-none mx-2 font-100 ${
                selectedSections.includes(name) ? 'focus: text-f7500' : null
              }`}
            >
              <span
                onClick={() => toggleSection(name)}
                onKeyPress={(event) => {
                  if (event.charCode === 13) {
                    event.preventDefault();
                    toggleSection(name);
                  }
                }}
                role="button"
                tabIndex="0"
              >
                {name}
              </span>
            </li>
          ))}
        </ul>
        <CasesGridList cases={allCases} selectedSections={selectedSections} />
      </ContentLayout>
    </MainLayout>
  );
}

CasesPage.propTypes = {
  location: locationShape.isRequired,
};
