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
        hero_image
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
  const { content, title, video, hero_image } = posts.find(
    ({ language }) => language === intl.locale,
  );
  return (
    <Layout>
      <h2>{title}</h2>
      {video && (
        /* eslint-disable-next-line jsx-a11y/alt-text */
        <img src={`${hero_image}`} alt={`Foursevens blog ${title}`} />
      )}
      <div dangerouslySetInnerHTML={{ __html: video }} />
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}

BlogPageTemplate.propTypes = {
  intl: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default injectIntl(BlogPageTemplate);
