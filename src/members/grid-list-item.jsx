import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';

import { memberShape } from './model';

export default function MembersGridListItem({ member }) {
  return (
    <li className="member">
      <Img fluid={member.portret.childImageSharp.fluid} alt={member.title} />
      <h4> {member.title}</h4>
      <h6>{member.function}</h6>
    </li>
  );
}

MembersGridListItem.propTypes = {
  member: PropTypes.shape(memberShape).isRequired,
};
