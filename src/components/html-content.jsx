import PropTypes from 'prop-types';
import React from 'react';

export function HtmlContent({ content }) {
  return (
    <span
      /* eslint-disable-next-line react/no-danger */
      dangerouslySetInnerHTML={{ __html: content }}
      style={{ display: 'block' }}
    />
  );
}

HtmlContent.defaultProps = {
  content: '',
};

HtmlContent.propTypes = {
  content: PropTypes.string,
};
