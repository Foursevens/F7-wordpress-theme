import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { injectIntl } from 'gatsby-plugin-intl';
import Layout from '../components/layout';

export const query = graphql`
  query($slug: String!) {
    allWordpressPost(filter: { slug: { eq: $slug } }) {
      nodes {
        content
        language
        title
        video
      }
    }
  }
`;

function BlogPageTemplate({
  data: {
    allWordpressPost: { nodes: posts },
  },
  intl,
}) {
  const { content, title, video } = posts.find(
    ({ language }) => language === intl.locale,
  );
  return (
    <Layout>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: video }} />
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}

BlogPageTemplate.propTypes = {
  intl: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default injectIntl(BlogPageTemplate);
