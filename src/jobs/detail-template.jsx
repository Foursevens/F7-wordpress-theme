import { graphql } from 'gatsby';
import React from 'react';

import { SEO, ShareButtons } from '../components';
import { ContentLayout, MainLayout } from '../layout';
import { locationShape } from '../model';
import styles from './detail-template.module.css';

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
      <ContentLayout title={title}>
        <div
          className={styles.all_text}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <ShareButtons />
      </ContentLayout>
    </MainLayout>
  );
}

JobDetailTemplate.propTypes = {
  location: locationShape.isRequired,
};
