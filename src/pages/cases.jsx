import { graphql } from 'gatsby';
import React from 'react';

import CasesGridList from '../cases/grid-list';
import { Filter, SEO } from '../components';
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
        name
        slug
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
  return (
    <MainLayout>
      <SEO pathname={location.pathname} title="Cases" />
      <ContentLayout title="Cases">
        <Filter
          check={(caze, selectedKeys) =>
            selectedKeys.some(
              (selectedKey) => caze.sections.slug === selectedKey,
            )
          }
          input={allCases}
          messagePrefix="cases.filter"
          taxonomies={allSections}
          taxonomyKey="slug"
          taxonomyLabel="name"
        >
          {(output) => <CasesGridList cases={output} />}
        </Filter>
      </ContentLayout>
    </MainLayout>
  );
}

CasesPage.propTypes = {
  location: locationShape.isRequired,
};
