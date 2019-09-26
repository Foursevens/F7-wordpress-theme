import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { Image } from '../components';
import { caseShape } from './model';

export default function CasesGridListItem({ wpCase }) {
  return (
    <li className="w-64 text-left mb-16 mr-2">
      <Link to={`/cases/${wpCase.slug}`} className="block">
        <div className="relative">
          <Image
            alt={wpCase.thumbnail_image.alt}
            file={wpCase.fields.remote_thumbnail_image}
          />
          <div className="w-full flex flex-col text-white bg-f7300 font-400 text-lg p-5 absolute -mt-16 inset-auto">
            <span dangerouslySetInnerHTML={{ __html: wpCase.title }} />
            <span>{wpCase.technologies.name}</span>
            <span>{wpCase.sections.name}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}

CasesGridListItem.propTypes = {
  wpCase: PropTypes.shape(caseShape).isRequired,
};
