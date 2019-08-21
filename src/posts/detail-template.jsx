import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';

export const query = graphql`
  query($language: String!, $slug: String!) {
    postDetail: wordpressPost(
      language: { eq: $language }
      slug: { eq: $slug }
    ) {
      ...PostData
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
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {hero_image && (
        <img src={`${hero_image}`} alt={`Foursevens blog ${title}`} />
      )}
      {video && <div dangerouslySetInnerHTML={{ __html: video }} />}
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}
