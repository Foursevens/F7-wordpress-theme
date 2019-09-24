import { graphql } from 'gatsby';
import { Link } from 'gatsby-plugin-intl';
import React from 'react';

import Image from '../components/image';
import Layout from '../components/layout';

export const query = graphql`
  query($language: String!, $slug: String!) {
    postDetail: wordpressPost(
      language: { eq: $language }
      slug: { eq: $slug }
    ) {
      ...PostBaseData
      content
      fields {
        remote_hero_image {
          childImageSharp {
            fluid(maxWidth: 768) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
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
      <Image file={fields.remote_hero_image} />
      {video && <div dangerouslySetInnerHTML={{ __html: video }} />}
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}
