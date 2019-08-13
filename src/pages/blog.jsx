import React from 'react';
import BlogPosts from '../components/blog/blogPosts';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default function BlogPage() {
  return (
    <Layout>
      <SEO title="Blog" />
      <div>
        <BlogPosts limit={47} />
      </div>
    </Layout>
  );
}
