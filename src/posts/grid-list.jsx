import PropTypes from 'prop-types';
import React from 'react';

import PostsGridListItem from './grid-list-item';
import { postShape } from './model';
import { ACCENT_COLORS } from './options';

export default function PostsGridList({ posts, selectedCategories }) {
  const filteredPosts =
    selectedCategories == null || selectedCategories.length === 0
      ? posts
      : posts.filter(
          ({ category }) =>
            category && selectedCategories.includes(category.name),
        );
  return (
    <ul className="flex flex-wrap -m-3">
      {filteredPosts.map((post, index) => (
        <PostsGridListItem
          accentColor={
            ACCENT_COLORS[
              ACCENT_COLORS.length - 1 - (index % ACCENT_COLORS.length)
            ]
          }
          post={post}
          key={post.id}
        />
      ))}
    </ul>
  );
}

PostsGridList.defaultProps = {
  selectedCategories: undefined,
};

PostsGridList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(postShape).isRequired).isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.string),
};
