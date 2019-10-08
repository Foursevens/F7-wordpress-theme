import { graphql } from 'gatsby';
import React, { useState } from 'react';

import { Container, Layout, SEO, Title } from '../components';
import PostsGridList from '../posts/grid-list';

export const query = graphql`
  query($language: String!) {
    allPosts: allWordpressPost(
      filter: { language: { eq: $language }, status: { eq: "publish" } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...PostBaseData
        fields {
          remote_thumbnail_image {
            childImageSharp {
              fluid(maxWidth: 350) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
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
      <Container>
        <Title as="h1" className="text-5xl">
          Blog
        </Title>
        <ul className="text-center mb-8 ">
          {allCategories.map(({ id, name }) => (
            <li
              className={`inline cursor-pointer select-none mx-2 font-100 ${
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
      </Container>
    </Layout>
  );
}
