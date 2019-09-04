import Img from 'gatsby-image';
import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { postShape } from './model';

export default function PostsGridListItem({ post }) {
  return (
    <li className="post">
      <Link to={`/blog/${post.slug}`}>
        {post.fields && post.fields.remote_hero_image && (
          <Img fluid={post.fields.remote_hero_image.childImageSharp.fluid} />
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
