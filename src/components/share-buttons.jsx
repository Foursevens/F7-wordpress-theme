import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faFacebookF,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';

export default function ShearButtons({ postUrl }) {
  function openPopup(e, type) {
    if (e.type === 'click' || e.keyCode === 13) {
      e.preventDefault();
      let url = '';
      switch (type) {
        case 'fb':
          url = 'https://www.facebook.com/sharer/sharer.php?u=';
          break;
        case 'li':
          url = 'https://www.linkedin.com/sharing/share-offsite/?url=';
          break;
        case 'twitter':
          url = 'https://twitter.com/share?url=';
          break;
        default:
          url = '';
      }
      /* eslint-env browser, node */
      return window.open(url + postUrl, '_blank');
    }
    return true;
  }
  return (
    <div className="text-left mt-8 text-black">
      <h3 className="font-900 font-title text-2xl mt-6 ">Share</h3>
      <button
        type="button"
        onKeyDown={(e) => openPopup(e, 'fb')}
        onClick={(e) => openPopup(e, 'fb')}
      >
        <FontAwesomeIcon icon={faFacebookF} />
      </button>
      <span className="p-3">/</span>
      <button
        type="button"
        onKeyDown={(e) => openPopup(e, 'li')}
        onClick={(e) => openPopup(e, 'li')}
      >
        <FontAwesomeIcon icon={faLinkedinIn} />
      </button>

      <span className="p-3">/</span>
      <button
        type="button"
        onKeyDown={(e) => openPopup(e, 'twitter')}
        onClick={(e) => openPopup(e, 'twitter')}
      >
        <FontAwesomeIcon icon={faTwitter} />
      </button>
    </div>
  );
}
ShearButtons.propTypes = {
  postUrl: PropTypes.string.isRequired,
};
