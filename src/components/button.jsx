import classNames from 'classnames';
import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

export default function Button({ children, className, to }) {
  return (
    <Link
      className={classNames(
        'inline-block px-8 py-3 hover:bg-f7300 border-2 border-f7300 font-800 rounded',
        className,
      )}
      to={to}
    >
      {children}
    </Link>
  );
}

Button.defaultProps = {
  className: undefined,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
};
