import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

export default function Facebook({
  description,
  image,
  locale,
  name,
  title,
  type,
  url,
}) {
  return (
    <Helmet>
      <meta property="og:description" content={description} />
      <meta property="og:image:alt" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={locale} />
      {name && <meta property="og:site_name" content={name} />}
      <meta property="og:title" content={title} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
}

Facebook.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  name: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  url: PropTypes.string.isRequired,
};

Facebook.defaultProps = {
  type: 'website',
  name: null,
};
