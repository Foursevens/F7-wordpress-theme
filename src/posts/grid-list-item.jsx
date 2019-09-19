import classNames from 'classnames';
import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Image from '../components/image';
import { postShape } from './model';

const IMAGE_COLORS = {
  Hero_Green1: 'border-f7500',
  Hero_Green2: 'border-f7400',
  Hero_Green4: 'border-f7600',
  Hero_Green5: 'border-f7300',
  Thumb_Green3: 'border-f7200',
  Thumb_Green4: 'border-f7400',
  Hero2_3: 'border-f7200',
};

export default function PostsGridListItem({ post }) {
  return (
    <div className="w-full my-3 sm:w-1/2 lg:w-1/3 xl:w-1/4">
      <div
        className={classNames(
          'min-h-full mx-3',
          'rounded overflow-hidden shadow-md hover:shadow-xl',
          'border-b-4',
          post.fields.remote_hero_image &&
            IMAGE_COLORS[post.fields.remote_hero_image.name],
        )}
      >
        <Link to={`/blog/${post.slug}`}>
          {post.fields.remote_hero_image && (
            <Image
              alt={post.fields.remote_hero_image.name}
              className="h-40"
              file={post.fields.remote_hero_image}
            />
          )}
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
  post: PropTypes.shape(postShape).isRequired,
};
