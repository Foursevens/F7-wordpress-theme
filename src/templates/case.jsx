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
        hero_image
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
  const { content, hero_image, title } = cases.find(
    ({ language }) => language === intl.locale,
  );
  return (
    <Layout>
      <h2>{title}</h2>
      <img src={hero_image} alt={`Foursevens ${title}`} />
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}

CasePageTemplate.propTypes = {
  data: PropTypes.shape({
    allWordpressWpCases: PropTypes.shape({
      content: PropTypes.string.isRequired,
      hero_image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  intl: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default injectIntl(CasePageTemplate);
