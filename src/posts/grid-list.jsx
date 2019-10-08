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
    <ul className="flex flex-wrap -mx-3 -mt-3 mb-3">
      {filteredPosts.map((post, index) => (
        <li
          className="px-3 my-3 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
          key={post.id}
        >
          <PostsGridListItem
            accentColor={
              ACCENT_COLORS[
                ACCENT_COLORS.length - 1 - (index % ACCENT_COLORS.length)
              ]
            }
            post={post}
          />
        </li>
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
