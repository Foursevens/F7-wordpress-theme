import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

export function HtmlContent({ content }) {
  useEffect(() => {
    const fullUrlPattern = /https?:\/\/(?<wwwSubDomain>www\.)?(?<adminSubdomain>admin\.)?foursevens\.be(?<path>[^ "']+)?/g;
    let match = fullUrlPattern.exec(content);
    while (match != null) {
      const [url] = match;
      // eslint-disable-next-line no-console
      console.warn(
        `Wordpress content contains hard-coded links to a front-end domain: "${url}"`,
      );
      match = fullUrlPattern.exec(content);
    }
  }, [content]);
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
