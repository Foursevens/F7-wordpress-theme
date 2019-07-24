import { graphql } from 'gatsby';
import { injectIntl } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../components/layout';

export const query = graphql`
  query($slug: String!) {
    allWordpressWpCases(filter: { slug: { eq: $slug } }) {
      nodes {
        content
        language
        title
      }
    }
  }
`;

function CasePageTemplate({
  data: {
    allWordpressWpCases: { nodes: cases },
  },
  intl,
}) {
  const { content, title } = cases.find(
    ({ language }) => language === intl.locale,
  );
  return (
    <Layout>
      <h2>{title}</h2>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}

CasePageTemplate.propTypes = {
  intl: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default injectIntl(CasePageTemplate);
