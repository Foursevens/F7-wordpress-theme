import { graphql } from 'gatsby';
import React, { useState } from 'react';

import CasesGridList from '../cases/grid-list';
import { Container, Layout, SEO, Title } from '../components';
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
    <Layout>
      <Container>
        <SEO pathname={location.pathname} title="Cases" />
        <Title as="h1" className="text-5xl">
          Cases
        </Title>
        <ul className="text-center mb-8">
          {allSections.map(({ id, name }) => (
            <li
              className={`inline cursor-pointer select-none mx-2 font-100 ${
                selectedSections.includes(name) ? 'focus: text-f7500' : null
              }`}
              key={id}
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
        <CasesGridList selectedSections={selectedSections} cases={allCases} />
      </Container>
    </Layout>
  );
}

CasesPage.propTypes = {
  location: locationShape.isRequired,
};
