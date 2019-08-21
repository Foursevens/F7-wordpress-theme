import { graphql } from 'gatsby';
import { injectIntl } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../components/layout';

export const query = graphql`
  query($slug: String!) {
    allWordpressPost(filter: { slug: { eq: $slug } }) {
      nodes {
        content
        hero_image
        language
        title
        video
      }
    }
  }
`;

function PostDetailTemplate({
  data: {
    allWordpressPost: { nodes: posts },
  },
  intl,
}) {
  const { content, title, video, hero_image } = posts.find(
    ({ language }) => language === intl.locale,
  );
  return (
    <Layout>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {video && <img src={`${hero_image}`} alt={`Foursevens blog ${title}`} />}
      <div dangerouslySetInnerHTML={{ __html: video }} />
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}

PostDetailTemplate.propTypes = {
  intl: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default injectIntl(PostDetailTemplate);
