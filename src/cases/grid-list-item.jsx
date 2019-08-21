import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import { caseShape } from './model';

export default function CasesGridListItem(props) {
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

CasesGridListItem.propTypes = {
  caseInfo: PropTypes.shape(caseShape).isRequired,
};
