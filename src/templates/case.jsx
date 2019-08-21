import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';

export const query = graphql`
  query($language: String!, $slug: String!) {
    wordpressWpCases(language: { eq: $language }, slug: { eq: $slug }) {
      content
      hero_image
      title
    }
  }
`;

export default function CasePageTemplate({
  data: {
    wordpressWpCases: { content, hero_image, title },
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
