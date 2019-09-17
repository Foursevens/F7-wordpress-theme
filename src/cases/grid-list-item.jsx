import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Image from '../components/image';
import { caseShape } from './model';

export default function CasesGridListItem({ wpCase }) {
  return (
    <li className="w-64 text-left flex flex-col mb-16 relative mr-2">
      <Link to={`/cases/${wpCase.slug}`}>
        <Image
          alt={wpCase.thumbnail_image.alt}
          file={wpCase.fields.remote_thumbnail_image}
        />
        <div className="w-full flex flex-col text-white bg-f7300 font-medium text-lg p-5 absolute -mt-16 inset-auto">
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
