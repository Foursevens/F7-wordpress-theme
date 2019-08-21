import PropTypes from 'prop-types';
import React from 'react';

import PostsGridListItem from './grid-list-item';
import { postShape } from './model';

export default function PostsGridList({ posts }) {
  return (
    <div className="blogItems">
      {posts.map((post) => (
        <PostsGridListItem postInfo={post} key={post.id} />
      ))}
    </div>
  );
}

PostsGridList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(postShape).isRequired).isRequired,
};
