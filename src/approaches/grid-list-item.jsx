import classNames from 'classnames';
import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { approachShape } from './model';

export default function ApproachesGridListItem({ approach, color }) {
  return (
    <div className="bg-white h-full text-center">
      <Link className="block p-6" to="/approach">
        <span
          className={classNames('inline-block my-3', color)}
          style={{ width: 150, height: 150 }}
        />
        <h3
          className="font-900 font-title my-6 text-xl uppercase"
          dangerouslySetInnerHTML={{ __html: approach.title }}
        />
        <p
          className="font-100 my-3"
          dangerouslySetInnerHTML={{
            __html: approach.approach_intro || approach.approach_text,
          }}
        />
      </Link>
    </div>
  );
}

ApproachesGridListItem.propTypes = {
  approach: PropTypes.shape(approachShape).isRequired,
  color: PropTypes.string.isRequired,
};
