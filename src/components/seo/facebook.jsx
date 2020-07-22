import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

export function Facebook({
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
      <meta content={description} property="og:description" />
      <meta content={description} property="og:image:alt" />
      <meta content={image} property="og:image" />
      <meta content={locale} property="og:locale" />
      {name && <meta content={name} property="og:site_name" />}
      <meta content={title} property="og:title" />
      <meta content={type} property="og:type" />
      <meta content={url} property="og:url" />
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
  name: null,
  type: 'website',
};
