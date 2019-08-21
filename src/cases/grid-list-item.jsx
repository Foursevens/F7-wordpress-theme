import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import { caseShape } from '../models';

export default function CaseGridListItem(props) {
  const { caseInfo } = props;
  return (
    <Link to={caseInfo.path} key={caseInfo.id}>
      <img
        src={caseInfo.thumbnail_image.url}
        alt={`foursevens case ${caseInfo.title}`}
      />
      <div className="cases-card">
        <span dangerouslySetInnerHTML={{ __html: caseInfo.title }} />
        <span>{caseInfo.technologies.name}</span>
        <span>{caseInfo.sections.name}</span>
      </div>
    </Link>
  );
}

CaseGridListItem.propTypes = {
  caseInfo: PropTypes.shape(caseShape).isRequired,
};
