import PropTypes from 'prop-types';
import React from 'react';

import ApproachesGridListItem from './grid-list-item';
import { approachShape } from './model';

export default function ApproachesGridList({ approaches }) {
  return (
    <ul className="flex flex-wrap space-between -mx-3">
      {approaches.map((approach) => (
        <li key={approach.id} className="px-3 md:w-1/3">
          <ApproachesGridListItem approach={approach} />
        </li>
      ))}
    </ul>
  );
}

ApproachesGridList.propTypes = {
  approaches: PropTypes.arrayOf(PropTypes.shape(approachShape).isRequired)
    .isRequired,
};
