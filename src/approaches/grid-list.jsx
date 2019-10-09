import PropTypes from 'prop-types';
import React from 'react';

import { approachShape } from './model';
import ApproachesGridListItem from './grid-list-item';

const COLORS = ['bg-f7400', 'bg-f7500', 'bg-f7200'];

export default function ApproachesGridList({ approaches }) {
  return (
    <ul className="flex flex-wrap space-between -mx-3">
      {approaches.map((approach, index) => (
        <li className="px-3 md:w-1/3" key={approach.id}>
          <ApproachesGridListItem
            approach={approach}
            color={COLORS[index % COLORS.length]}
          />
        </li>
      ))}
    </ul>
  );
}

ApproachesGridList.propTypes = {
  approaches: PropTypes.arrayOf(PropTypes.shape(approachShape).isRequired)
    .isRequired,
};
