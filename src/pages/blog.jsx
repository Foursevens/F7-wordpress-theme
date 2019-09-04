import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostsGridList from '../posts/grid-list';

export const query = graphql`
  query($language: String!) {
    allPosts: allWordpressPost(filter: { language: { eq: $language } }) {
      nodes {
        ...PostBaseData
      }
    }
  }
`;

export default function BlogPage({
  data: {
    allPosts: { nodes: allPosts },
  },
}) {
  return (
    <Layout>
      <SEO title="Blog" />
      <div>
        <PostsGridList posts={allPosts} />
      </div>
    </Layout>
  );
}
