import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faFacebookF,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import React from 'react';

import SideBarItem from './side-bar-item';

export default function ShareButtons() {
  const currentUrl =
    typeof window !== 'undefined' ? window.location.href : null;
  return (
    <SideBarItem title="Share">
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
    </SideBarItem>
  );
}
