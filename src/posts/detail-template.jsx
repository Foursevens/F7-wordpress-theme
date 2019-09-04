import { graphql } from 'gatsby';
import Img from 'gatsby-image';
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
    postDetail: { content, fields, title, video },
  },
}) {
  return (
    <Layout>
      <Link to="/blog">Blog</Link>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {fields && fields.remote_hero_image && (
        <Img fluid={fields.remote_hero_image.childImageSharp.fluid} />
      )}
      {video && <div dangerouslySetInnerHTML={{ __html: video }} />}
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}
