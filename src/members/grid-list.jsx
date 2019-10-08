import PropTypes from 'prop-types';
import React from 'react';

import MemberCard from './card';
import { memberShape } from './model';
import MemberCardApply from './card-apply';

export default function MembersGridList({ members }) {
  return (
    <ul className="flex flex-wrap -mx-3 -mt-3 mb-3">
      {members.map((member) => (
        <li
          className="flex-grow p-3 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
          key={member.id}
        >
          <MemberCard member={member} />
        </li>
      ))}
      <li className="flex-grow p-3 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <MemberCardApply />
      </li>
    </ul>
  );
}

MembersGridList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape(memberShape).isRequired)
    .isRequired,
};
