import PropTypes from 'prop-types';
import React from 'react';

import { memberShape } from './model';
import MembersGridListItem from './grid-list-item';

export default function MembersGridList(props) {
  const { members } = props;
  return (
    <div className="members">
      {members.map((member) => (
        <MembersGridListItem memberInfo={member} key={member.id} />
      ))}
    </div>
  );
}

MembersGridList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape(memberShape).isRequired)
    .isRequired,
};
