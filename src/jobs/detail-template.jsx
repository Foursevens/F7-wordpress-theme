import { graphql } from 'gatsby';
import React from 'react';

import { Container, Layout, SEO, ShareButtons, Title } from '../components';
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
    <Layout>
      <SEO pathname={location.pathname} title={title} />
      <Container>
        <Title as="h1" className="text-5xl">
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </Title>
        <div
          className={styles.all_text}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <ShareButtons />
      </Container>
    </Layout>
  );
}

JobDetailTemplate.propTypes = {
  location: locationShape.isRequired,
};
