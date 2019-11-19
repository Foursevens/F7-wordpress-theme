import { graphql } from 'gatsby';
import React from 'react';

import { Container, SEO, Title } from '../components';
import { MainLayout } from '../layout';
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
    <MainLayout>
      <SEO pathname={location.pathname} title="Jobs" />
      <Container>
        <Title as="h1" className="text-5xl">
          Jobs
        </Title>
        <JobsGridList jobs={allJobs} />
      </Container>
    </MainLayout>
  );
}

JobsPage.propTypes = {
  location: locationShape.isRequired,
};
