import classNames from 'classnames';
import { FormattedDate } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { Hero, Tag } from '../components';
import { imageModel } from '../model';
import ContentLayout from './content';
import styles from './content-detail.module.css';

export default function ContentDetailLayout({
  aside,
  centered,
  children,
  date,
  hero,
  heroCopyright,
  taxonomy,
  title,
}) {
  const content = (
    <div className={classNames('text-2xl font-300', styles.content)}>
      {children}
    </div>
  );
  return (
    <>
      <Hero image={hero} imageCopyright={heroCopyright} />
      <ContentLayout title={title}>
        <div
          className={classNames('my-6 text-gray-600', {
            'text-center': centered,
            'text-center md:text-left': !centered,
          })}
        >
          <Tag>{taxonomy}</Tag> &ndash;{' '}
          <FormattedDate
            value={date}
            day="numeric"
            month="long"
            year="numeric"
          />
        </div>
        {aside ? (
          <div className="flex flex-wrap sm:flex-no-wrap -mx-6">
            <div
              className="flex-shrink-0 sm:order-2 hidden md:block mx-6"
              style={{ 'flex-basis': '200px' }}
            >
              {aside}
            </div>
            <div className="mx-6 sm:order-1">{content}</div>
          </div>
        ) : (
          content
        )}
      </ContentLayout>
    </>
  );
}

ContentDetailLayout.defaultProps = {
  aside: null,
  centered: false,
  heroCopyright: null,
};

ContentDetailLayout.propTypes = {
  aside: PropTypes.node,
  children: PropTypes.node.isRequired,
  centered: PropTypes.bool,
  date: PropTypes.string.isRequired,
  hero: imageModel.isRequired,
  heroCopyright: PropTypes.string,
  taxonomy: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
