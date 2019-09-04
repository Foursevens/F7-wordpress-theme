import PropTypes from 'prop-types';
import React from 'react';

import MembersGridListItem from './grid-list-item';
import { memberShape } from './model';

export default function MembersGridList({ members }) {
  return (
    <ul>
      {members.map((member) => (
        <MembersGridListItem member={member} key={member.id} />
      ))}
    </ul>
  );
}

MembersGridList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape(memberShape).isRequired)
    .isRequired,
};
