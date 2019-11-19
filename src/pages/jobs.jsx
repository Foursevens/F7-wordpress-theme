import { graphql } from 'gatsby';
import React from 'react';

import { SEO } from '../components';
import { ContentLayout, MainLayout } from '../layout';
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
      <ContentLayout title="Jobs">
        <JobsGridList jobs={allJobs} />
      </ContentLayout>
    </MainLayout>
  );
}

JobsPage.propTypes = {
  location: locationShape.isRequired,
};
