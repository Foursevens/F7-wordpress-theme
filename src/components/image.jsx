/* eslint react/jsx-props-no-spreading: "off" */

import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';

export default function Image({ file, ...props }) {
  return file ? <Img fluid={file.childImageSharp.fluid} {...props} /> : <></>;
}

Image.propTypes = {
  file: PropTypes.shape({ childImageSharp: PropTypes.object.isRequired })
    .isRequired,
};
