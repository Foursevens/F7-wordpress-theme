import PropTypes from 'prop-types';
import React from 'react';

import Image from '../components/image';
import { memberShape } from './model';

export default function MembersGridListItem({ member }) {
  return (
    <li className="member">
      <Image alt={member.title} file={member.fields.remote_portret} />
      <h4>{member.title}</h4>
      <h6>{member.function}</h6>
    </li>
  );
}

MembersGridListItem.propTypes = {
  member: PropTypes.shape(memberShape).isRequired,
};
