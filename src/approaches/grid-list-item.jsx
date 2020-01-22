import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { Image } from '../components';
import { approachShape } from './model';

export default function ApproachesGridListItem({ approach }) {
  return (
    <div className="bg-white h-full text-center">
      <Link className="block p-6" to="/approach">
        <Image alt={approach.image.alt} file={approach.fields.remoteImage} />
        <h3 className="font-900 font-title my-6 text-xl uppercase">
          {approach.title}
        </h3>
        <p className="font-100 my-3">
          <div
            dangerouslySetInnerHTML={{
              __html: approach.approachIntro || approach.approachText,
            }}
          />
        </p>
      </Link>
    </div>
  );
}

ApproachesGridListItem.propTypes = {
  approach: PropTypes.shape(approachShape).isRequired,
};
