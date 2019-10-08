/* eslint react/jsx-props-no-spreading: "off" */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { imageModel } from '../model';
import Image from './image';

export default function Hero({
  children,
  colorize,
  image,
  imageCopyright,
  position,
  ...props
}) {
  return (
    <div className="hidden sm:block relative shadow">
      <Image
        file={image}
        imgStyle={{ objectPosition: position }}
        style={{ height: 450 }}
        {...props}
      />
      {colorize && (
        <div
          className={classNames('absolute inset-0 h-full opacity-50', colorize)}
        />
      )}
      <div className="absolute inset-0 container mx-auto">{children}</div>
      {imageCopyright && (
        <div className="absolute bottom-0 left-0 bg-gray-900 text-white opacity-50 p-1">
          Foto: {imageCopyright}
        </div>
      )}
    </div>
  );
}

Hero.defaultProps = {
  children: null,
  colorize: false,
  image: null,
  imageCopyright: null,
  position: 'center center',
};

Hero.propTypes = {
  children: PropTypes.node,
  colorize: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  image: imageModel,
  imageCopyright: PropTypes.string,
  position: PropTypes.string,
};
