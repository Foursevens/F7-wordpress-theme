import classNames from 'classnames';
import { FormattedDate, Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { Image, Tag } from '../components';
import { postShape } from './model';

export default function PostCard({ accentColor, post }) {
  return (
    <div
      className={classNames(
        'min-h-full',
        'rounded shadow-md hover:shadow-xl',
        `border-b-4 ${accentColor.border}`,
      )}
    >
      <Link to={`/blog/${post.slug}`}>
        <header className={classNames(accentColor.background, 'h-40')}>
          {post.fields.remoteThumbnailImage && (
            <Image
              alt={post.thumbnailImage.alt}
              className="h-full"
              file={post.fields.remoteThumbnailImage}
            />
          )}
        </header>
        <div className="px-6 py-4">
          <Tag>{post.tag ? post.tag.name : 'Article'}</Tag>
          <span className="text-sm ">
            {' '}
            -{' '}
            <FormattedDate
              value={post.date}
              day="numeric"
              month="short"
              year="numeric"
            />
          </span>
          <div className="font-title font-700 text-xl mb-2 uppercase">
            {post.title}
          </div>
          <p className="font-300 leading-normal mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.intro }} />
          </p>
        </div>
      </Link>
    </div>
  );
}

PostCard.propTypes = {
  accentColor: PropTypes.shape({
    background: PropTypes.string.isRequired,
    border: PropTypes.string.isRequired,
  }).isRequired,
  post: PropTypes.shape(postShape).isRequired,
};
