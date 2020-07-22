import { graphql } from 'gatsby';
import React from 'react';

import { HtmlContent, SEO } from '../components';
import { ContentDetailLayout, MainLayout } from '../layout';

export const query = graphql`
  query($language: String!) {
    thanks: wordpressPage(
      language: { eq: $language }
      status: { eq: "publish" }
      slug: { eq: "dank-u" }
    ) {
      content
      title
    }
  }
`;

export default function ThankYouPage({
  data: {
    thanks: { content, title },
  },
}) {
  return (
    <MainLayout showNavigation={false}>
      <SEO title={title} />
      <ContentDetailLayout title={title}>
        <HtmlContent content={content} />
      </ContentDetailLayout>
    </MainLayout>
  );
}
