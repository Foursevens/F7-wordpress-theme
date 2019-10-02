import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faFacebookF,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

export default function ShareButtons() {
  /* eslint-env browser, node */
  const currentUrl = window.location.href;
  return (
    <div className="text-left mt-8 text-black">
      <h3 className="font-900 font-title text-2xl mt-6 ">Share</h3>
      <ul>
        <li className="inline">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <span className="p-3">/</span>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <span className="p-3">/</span>
          <a
            href={`https://twitter.com/share?url=${currentUrl}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </li>
      </ul>
    </div>
  );
}
