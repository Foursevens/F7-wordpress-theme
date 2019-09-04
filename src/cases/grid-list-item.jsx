import Img from 'gatsby-image';
import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { caseShape } from './model';

export default function CasesGridListItem({ wpCase }) {
  return (
    <li>
      <Link to={`/cases/${wpCase.slug}`}>
        {wpCase.fields.remote_thumbnail_image && (
          <Img
            alt={wpCase.fields.remote_thumbnail_image.alt}
            fluid={wpCase.fields.remote_thumbnail_image.childImageSharp.fluid}
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
