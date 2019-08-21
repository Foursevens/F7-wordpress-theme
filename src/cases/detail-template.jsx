import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';

export const query = graphql`
  query($language: String!, $slug: String!) {
    caseDetail: wordpressWpCases(
      language: { eq: $language }
      slug: { eq: $slug }
    ) {
      ...CaseData
    }
  }
`;

export default function CaseDetailTemplate({
  data: {
    caseDetail: { content, hero_image, title },
  },
}) {
  return (
    <Layout>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      <img src={hero_image} alt={`Foursevens ${title}`} />
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}
