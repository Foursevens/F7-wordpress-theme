import { graphql } from 'gatsby';
import React from 'react';

import { SEO } from '../components';
import { ContentDetailLayout, MainLayout } from '../layout';

export const query = graphql`
  query($language: String!) {
    thanks: wordpressPage(
      language: { eq: $language }
      status: { eq: "publish" }
      slug: { eq: "dank-u" }
    ) {
      content
      date
      title
    }
  }
`;

export default function ThankYouPage({
  data: {
    thanks: { content, date, title },
  },
}) {
  return (
    <MainLayout>
      <SEO title={title} />
      <ContentDetailLayout date={date} title={title}>
        <span
          dangerouslySetInnerHTML={{ __html: content }}
          style={{ display: 'block' }}
        />
      </ContentDetailLayout>
    </MainLayout>
  );
}
