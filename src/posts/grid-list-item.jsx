import classNames from 'classnames';
import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Image from '../components/image';
import { postShape } from './model';

export default function PostsGridListItem({ accentColor, post }) {
  return (
    <div className="w-full my-3 sm:w-1/2 lg:w-1/3 xl:w-1/4">
      <div
        className={classNames(
          'min-h-full mx-3',
          'rounded shadow-md hover:shadow-xl',
          `border-b-4 ${accentColor.border}`,
        )}
      >
        <Link to={`/blog/${post.slug}`}>
          <header className={classNames(accentColor.background, 'h-40')}>
            {post.fields.remote_thumbnail_image && (
              <Image
                alt={post.fields.remote_thumbnail_image.name}
                className="h-full"
                file={post.fields.remote_thumbnail_image}
              />
            )}
          </header>
          <div className="px-6 py-4">
            {post.tags === null ? (
              <span className="font-bold font-title text-f7500">Article</span>
            ) : (
              <span className="font-bold font-title text-f7500">
                {post.tags[0].name}
              </span>
            )}
            <span className="text-sm ">
              {' '}
              - {new Date(post.date).toLocaleDateString()}
            </span>
            <div
              className="font-title font-bold text-2xl text-xl mb-2 uppercase"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
            <p
              className="font-hairline text-sm font-sans leading-normal mb-12"
              dangerouslySetInnerHTML={{ __html: post.intro }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

PostsGridListItem.propTypes = {
  accentColor: PropTypes.shape({
    background: PropTypes.string.isRequired,
    border: PropTypes.string.isRequired,
  }).isRequired,
  post: PropTypes.shape(postShape).isRequired,
};
