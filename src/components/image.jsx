/* eslint react/jsx-props-no-spreading: "off" */

import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';

export function Image({ file, ...props }) {
  if (!file) {
    return null;
  }
  if ('fluid' in file.childImageSharp) {
    return <Img fluid={file.childImageSharp.fluid} {...props} />;
  }
  if ('fixed' in file.childImageSharp) {
    return <Img fixed={file.childImageSharp.fixed} {...props} />;
  }
  return null;
}

Image.defaultProps = {
  file: null,
};

Image.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  file: PropTypes.shape({ childImageSharp: PropTypes.object.isRequired }),
};
