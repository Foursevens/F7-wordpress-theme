import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Image from '../components/image';
import { caseShape } from './model';

export default function CasesGridListItem({ wpCase }) {
  return (
    <li>
      <Link to={`/cases/${wpCase.slug}`}>
        <Image
          alt={wpCase.thumbnail_image.alt}
          file={wpCase.fields.remote_thumbnail_image}
        />
        <span dangerouslySetInnerHTML={{ __html: wpCase.title }} />
        <span>{wpCase.technologies.name}</span>
        <span>{wpCase.sections.name}</span>
      </Link>
    </li>
  );
}

CasesGridListItem.propTypes = {
  wpCase: PropTypes.shape(caseShape).isRequired,
};
