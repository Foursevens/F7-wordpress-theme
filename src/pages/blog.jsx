import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostsGridList from '../posts/grid-list';

export default function BlogPage() {
  return (
    <Layout>
      <SEO title="Blog" />
      <div>
        <PostsGridList limit={47} />
      </div>
    </Layout>
  );
}
