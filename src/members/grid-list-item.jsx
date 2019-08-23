import PropTypes from 'prop-types';
import React from 'react';

import { memberShape } from './model';

export default function MembersGridListItem({ memberInfo }) {
  return (
    <li className="member">
      <img
        src={memberInfo.portret.childImageSharp.fluid.src}
        alt={memberInfo.title}
      />
      <h4> {memberInfo.title}</h4>
      <h6>{memberInfo.function}</h6>
    </li>
  );
}

MembersGridListItem.propTypes = {
  memberInfo: PropTypes.shape(memberShape).isRequired,
};
