import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../components/layout';

export const query = graphql`
  query($slug: String!) {
    wpCase: wordpressWpCases(slug: { eq: $slug }) {
      content
      title
    }
  }
`;

export default function CasePageTemplate({
  data: {
    wpCase: { content, title },
  },
}) {
  return (
    <Layout>
      <h2>{title}</h2>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}

CasePageTemplate.propTypes = {
  data: PropTypes.shape({
    wpCase: PropTypes.shape({
      content: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
