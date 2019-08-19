import React from 'react';
import { Link } from 'gatsby';
import propTypes from 'prop-types';

export default function Case(props) {
  const { caseInfo } = props;
  return (
    <Link to={caseInfo.path} key={caseInfo.id}>
      <img
        src={caseInfo.thumbnail_image.url}
        alt={`foursevens case ${caseInfo.title}`}
      />
      <div className="cases-card">
        <span>{caseInfo.title}</span>
        <span>{caseInfo.technologies.name}</span>
        <span>{caseInfo.sections.name}</span>
      </div>
    </Link>
  );
}
Case.propTypes = {
  caseInfo: propTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};
