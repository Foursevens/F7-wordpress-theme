import { graphql } from 'gatsby';
import { Link } from 'gatsby-plugin-intl';
import React from 'react';

import Layout from '../components/layout';

export const query = graphql`
  query($language: String!, $slug: String!) {
    postDetail: wordpressPost(
      language: { eq: $language }
      slug: { eq: $slug }
    ) {
      ...PostBaseData
      content
      video
    }
  }
`;

export default function PostDetailTemplate({
  data: {
    postDetail: { content, title, video, hero_image },
  },
}) {
  return (
    <Layout>
      <Link to="/blog">Blog</Link>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {hero_image && <img alt={title} src={hero_image} />}
      {video && <div dangerouslySetInnerHTML={{ __html: video }} />}
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}
