import PropTypes from 'prop-types';
import React from 'react';

import { Grid } from '../layout';
import PostCard from './card';
import { postShape } from './model';
import { ACCENT_COLORS } from './options';

export default function PostsGridList({ posts }) {
  return (
    <Grid>
      {posts.map((post, index) => (
        <PostCard
          key={post.id}
          accentColor={
            ACCENT_COLORS[
              ACCENT_COLORS.length - 1 - (index % ACCENT_COLORS.length)
            ]
          }
          post={post}
        />
      ))}
    </Grid>
  );
}

PostsGridList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(postShape).isRequired).isRequired,
};
