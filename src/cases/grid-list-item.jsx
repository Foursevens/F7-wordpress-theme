import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import { caseShape } from './model';

export default function CasesGridListItem({ caseInfo }) {
  return (
    <li>
      <Link to={caseInfo.path} key={caseInfo.id}>
        {caseInfo.thumbnail_image && (
          <img
            alt={caseInfo.thumbnail_image.alt || caseInfo.title}
            src={caseInfo.thumbnail_image.url}
          />
        )}
        <div className="cases-card">
          <span dangerouslySetInnerHTML={{ __html: caseInfo.title }} />
          <span>{caseInfo.technologies.name}</span>
          <span>{caseInfo.sections.name}</span>
        </div>
      </Link>
    </li>
  );
}

CasesGridListItem.propTypes = {
  caseInfo: PropTypes.shape(caseShape).isRequired,
};
