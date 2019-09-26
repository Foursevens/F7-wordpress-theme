import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { imageModel } from '../model';
import Image from './image';

export default function Hero({ children, colorize, image, position }) {
  return (
    <div className="hidden sm:block relative shadow">
      <Image
        file={image}
        imgStyle={{ objectPosition: position }}
        style={{ height: 450 }}
      />
      {colorize && (
        <div
          className={classNames(
            'absolute top-0 left-0 right-0 h-full opacity-50',
            colorize,
          )}
        />
      )}
      <div className="absolute top-0 left-0 right-0 container mx-auto">
        {children}
      </div>
    </div>
  );
}

Hero.defaultProps = {
  children: null,
  colorize: false,
  position: 'center center',
};

Hero.propTypes = {
  children: PropTypes.node,
  colorize: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  image: imageModel.isRequired,
  position: PropTypes.string,
};
