import { graphql } from 'gatsby';
import React, { useState } from 'react';

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
    allCategories: allWordpressCategory(
      filter: { language: { eq: $language } }
    ) {
      nodes {
        id
        language
        name
      }
    }
  }
`;

export default function BlogPage({
  data: {
    allPosts: { nodes: allPosts },
    allCategories: { nodes: allCategories },
  },
}) {
  const [categoryFilter, setCategoryFilter] = useState({});

  function toggleSection(name) {
    setCategoryFilter({
      ...categoryFilter,
      [name]: !categoryFilter[name],
    });
  }

  const selectedCategory =
    categoryFilter == null
      ? null
      : Object.entries(categoryFilter)
          .filter(([, value]) => value !== false)
          .map(([key]) => key);
  return (
    <Layout>
      <SEO title="Blog" />
      <div>
        <h3 className="text-center font-title font-bold text-2xl text-xl mb-2 uppercase">
          Blog
        </h3>
        <ul className="text-center mb-8 ">
          {allCategories.map(({ id, name }) => (
            <li
              className={`inline cursor-pointer select-none mx-2 font-hairline ${
                selectedCategory.includes(name) ? 'focus: text-f7500' : null
              }`}
              key={id}
            >
              <span
                onClick={() => toggleSection(name)}
                onKeyPress={(event) => {
                  if (event.charCode === 13) {
                    event.preventDefault();
                    toggleSection(name);
                  }
                }}
                role="button"
                tabIndex="0"
              >
                {name}
              </span>
            </li>
          ))}
        </ul>
        <PostsGridList selectedCategories={selectedCategory} posts={allPosts} />
      </div>
    </Layout>
  );
}
