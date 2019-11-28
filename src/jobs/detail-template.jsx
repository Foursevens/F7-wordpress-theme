import { graphql } from 'gatsby';
import React from 'react';

import { SEO, ShareButtons } from '../components';
import { ContentDetailLayout, MainLayout } from '../layout';
import { locationShape } from '../model';

export const query = graphql`
  query($language: String!, $slug: String!) {
    jobDetail: wordpressWpJobs(
      language: { eq: $language }
      slug: { eq: $slug }
    ) {
      ...JobBaseData
      content
    }
  }
`;

export default function JobDetailTemplate({
  data: {
    jobDetail: { title, content },
  },
  location,
}) {
  return (
    <MainLayout>
      <SEO pathname={location.pathname} title={title} />
      <ContentDetailLayout aside={<ShareButtons />} title={title}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </ContentDetailLayout>
    </MainLayout>
  );
}

JobDetailTemplate.propTypes = {
  location: locationShape.isRequired,
};
