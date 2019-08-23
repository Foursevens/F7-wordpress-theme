import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { postShape } from './model';

export default function PostsGridListItem({ post }) {
  return (
    <li className="post">
      <Link to={`/${post.path}`}>
        {post.hero_image === null ? (
          <img
            alt={post.title}
            src="https://dummyimage.com/400x300/000/fff&text=Thumbnail+image"
          />
        ) : (
          <img alt={post.title} src={post.hero_image} />
        )}
        <p>
          {post.tags === null ? (
            <span>Article</span>
          ) : (
            <span>{post.tags[0].name}</span>
          )}
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </p>
        <h3 dangerouslySetInnerHTML={{ __html: post.title }} />
        <p dangerouslySetInnerHTML={{ __html: post.intro }} />
      </Link>
    </li>
  );
}

PostsGridListItem.propTypes = {
  post: PropTypes.shape(postShape).isRequired,
};
