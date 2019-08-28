import { graphql } from 'gatsby';
import { Link } from 'gatsby-plugin-intl';
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
    caseDetail: { content, hero_image, title, thumbnail_image },
  },
}) {
  return (
    <Layout>
      <Link to="/cases">Cases</Link>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {hero_image && (
        <img
          alt={(thumbnail_image && thumbnail_image.alt) || title}
          src={hero_image}
        />
      )}
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}
