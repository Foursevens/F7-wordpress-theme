import PropTypes from 'prop-types';
import React from 'react';
import { memberShape } from './model';

export default function MembersGridListItem(props) {
  const { memberInfo } = props;
  return (
    <div className="member">
      <img
        src={memberInfo.portret.childImageSharp.fluid.src}
        alt={`${memberInfo.title}`}
      />
      <h4> {memberInfo.title}</h4>
      <h6>{memberInfo.function}</h6>
    </div>
  );
}

MembersGridListItem.propTypes = {
  memberInfo: PropTypes.shape(memberShape).isRequired,
};
