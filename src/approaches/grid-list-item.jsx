import PropTypes from 'prop-types';
import React from 'react';

import { approachShape } from './model';

export default function ApproachesGridListItem({ approach }) {
  return (
    <li>
      <h2 dangerouslySetInnerHTML={{ __html: approach.title }} />
      <p dangerouslySetInnerHTML={{ __html: approach.approach_text }} />
    </li>
  );
}

ApproachesGridListItem.propTypes = {
  approach: PropTypes.shape(approachShape).isRequired,
};
