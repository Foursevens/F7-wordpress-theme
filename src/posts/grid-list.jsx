import PropTypes from 'prop-types';
import React from 'react';

import PostsGridListItem from './grid-list-item';
import { postShape } from './model';

export default function PostsGridList({ posts }) {
  return (
    <ul className="blogItems">
      {posts.map((post) => (
        <PostsGridListItem post={post} key={post.id} />
      ))}
    </ul>
  );
}

PostsGridList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(postShape).isRequired).isRequired,
};
