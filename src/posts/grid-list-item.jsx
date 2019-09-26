import classNames from 'classnames';
import { FormattedDate, Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { Image, Tag } from '../components';
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
            <Tag>{post.tags ? post.tags[0].name : 'Article'}</Tag>
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
            <div
              className="font-title font-700 text-xl mb-2 uppercase"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
            <p
              className="font-300 leading-normal mb-12"
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
