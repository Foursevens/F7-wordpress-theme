import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import { caseShape } from './model';

export default function CasesGridListItem({ wpCase }) {
  return (
    <li>
      <Link to={wpCase.path}>
        {wpCase.thumbnail_image && (
          <img
            alt={wpCase.thumbnail_image.alt || wpCase.title}
            src={wpCase.thumbnail_image.url}
          />
        )}
        <div className="cases-card">
          <span dangerouslySetInnerHTML={{ __html: wpCase.title }} />
          <span>{wpCase.technologies.name}</span>
          <span>{wpCase.sections.name}</span>
        </div>
      </Link>
    </li>
  );
}

CasesGridListItem.propTypes = {
  wpCase: PropTypes.shape(caseShape).isRequired,
};
