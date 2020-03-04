import { graphql } from 'gatsby';
import React from 'react';

import { Filter, SEO } from '../components';
import { ContentLayout, MainLayout } from '../layout';
import { locationShape } from '../model';
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
          remoteThumbnailImage {
            childImageSharp {
              fluid(maxWidth: 350) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allTags: allWordpressTag(filter: { language: { eq: $language } }) {
      nodes {
        slug
        name
      }
    }
  }
`;

export default function BlogPage({
  data: {
    allPosts: { nodes: allPosts },
    allTags: { nodes: allTags },
  },
  location,
}) {
  return (
    <MainLayout>
      <SEO pathname={location.pathname} title="Blog" />
      <ContentLayout title="Blog">
        <Filter
          check={(post, selectedKeys) =>
            selectedKeys.some((selectedKey) => post.tag.slug === selectedKey)
          }
          input={allPosts}
          messagePrefix="blog.filter"
          taxonomies={allTags}
          taxonomyKey="slug"
          taxonomyLabel="name"
        >
          {(output) => <PostsGridList posts={output} />}
        </Filter>
      </ContentLayout>
    </MainLayout>
  );
}

BlogPage.propTypes = {
  location: locationShape.isRequired,
};
