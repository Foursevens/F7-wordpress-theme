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
        hero_image
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
  // eslint-disable-next-line camelcase
  const { content, title, video, hero_image } = posts.find(
    ({ language }) => language === intl.locale,
  );
  return (
    <Layout>
      <h2>{title}</h2>
      <div>
        {/* eslint-disable-next-line camelcase,jsx-a11y/alt-text */}
        {video === null ? <img src={`${hero_image}`} /> : null}
      </div>
      <div dangerouslySetInnerHTML={{ __html: video }} />
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}

BlogPageTemplate.propTypes = {
  intl: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default injectIntl(BlogPageTemplate);
