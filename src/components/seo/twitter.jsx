import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

export function Twitter({ description, image, title, type, username }) {
  return (
    <Helmet>
      <meta content={type} name="twitter:card" />
      {username && <meta content={username} name="twitter:creator" />}
      <meta content={description} name="twitter:description" />
      <meta content={image} name="twitter:image" />
      <meta content={description} name="twitter:image:alt" />
      <meta content={title} name="twitter:title" />
    </Helmet>
  );
}

Twitter.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  username: PropTypes.string,
};

Twitter.defaultProps = {
  type: 'summary_large_image',
  username: null,
};
