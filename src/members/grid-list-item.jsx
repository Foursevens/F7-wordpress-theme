import PropTypes from 'prop-types';
import React from 'react';

import { memberShape } from './model';

export default function MembersGridListItem({ member }) {
  return (
    <li className="member">
      <img src={member.portret.childImageSharp.fluid.src} alt={member.title} />
      <h4> {member.title}</h4>
      <h6>{member.function}</h6>
    </li>
  );
}

MembersGridListItem.propTypes = {
  member: PropTypes.shape(memberShape).isRequired,
};
