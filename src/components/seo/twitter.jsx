import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

export default function Twitter({ description, image, title, type, username }) {
  return (
    <Helmet>
      <meta name="twitter:card" content={type} />
      {username && <meta name="twitter:creator" content={username} />}
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={description} />
      <meta name="twitter:title" content={title} />
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
