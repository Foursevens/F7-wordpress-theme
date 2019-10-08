/* eslint react/jsx-props-no-spreading: "off" */

import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';

export default function Image({ file, ...props }) {
  if (!file) {
    return <></>;
  }
  if ('fluid' in file.childImageSharp) {
    return <Img fluid={file.childImageSharp.fluid} {...props} />;
  }
  if ('fixed' in file.childImageSharp) {
    return <Img fixed={file.childImageSharp.fixed} {...props} />;
  }
  return <></>;
}

Image.defaultProps = {
  file: null,
};

Image.propTypes = {
  file: PropTypes.shape({ childImageSharp: PropTypes.object.isRequired }),
};
