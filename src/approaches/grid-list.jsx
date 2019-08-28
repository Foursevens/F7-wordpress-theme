import PropTypes from 'prop-types';
import React from 'react';

import { approachShape } from './model';
import ApproachesGridListItem from './grid-list-item';

export default function ApproachesGridList({ approaches }) {
  return (
    <ul>
      {approaches.map((approach) => (
        <ApproachesGridListItem approach={approach} key={approach.id} />
      ))}
    </ul>
  );
}

ApproachesGridList.propTypes = {
  approaches: PropTypes.arrayOf(PropTypes.shape(approachShape).isRequired)
    .isRequired,
};
