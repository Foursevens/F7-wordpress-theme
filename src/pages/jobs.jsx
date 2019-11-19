import { graphql } from 'gatsby';
import React from 'react';

import { Container, Layout, SEO, Title } from '../components';
import JobsGridList from '../jobs/grid-list';
import { locationShape } from '../model';

export const query = graphql`
  query($language: String!) {
    allJobs: allWordpressWpJobs(filter: { language: { eq: $language } }) {
      nodes {
        ...JobBaseData
      }
    }
  }
`;

export default function JobsPage({
  data: {
    allJobs: { nodes: allJobs },
  },
  location,
}) {
  return (
    <Layout>
      <SEO pathname={location.pathname} title="Jobs" />
      <Container>
        <Title as="h1" className="text-5xl">
          Jobs
        </Title>
        <JobsGridList jobs={allJobs} />
      </Container>
    </Layout>
  );
}

JobsPage.propTypes = {
  location: locationShape.isRequired,
};
