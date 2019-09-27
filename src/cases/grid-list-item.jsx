import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { Image } from '../components';
import { caseShape } from './model';

export default function CasesGridListItem({ wpCase }) {
  return (
    <Link to={`/cases/${wpCase.slug}`} className="block rounded relative">
      <Image
        alt={wpCase.thumbnail_image.alt}
        file={wpCase.fields.remote_thumbnail_image}
      />
      <div className="absolute inset-auto w-full -mt-16">
        <div className="bg-f7300 font-500 text-white text-lg p-5">
          <div
            className="uppercase"
            dangerouslySetInnerHTML={{ __html: wpCase.customer_name }}
          />
          <div className="font-300 text-sm">{wpCase.technologies.name}</div>
          <div className="font-300 text-xs">{wpCase.sections.name}</div>
        </div>
      </div>
    </Link>
  );
}

CasesGridListItem.propTypes = {
  wpCase: PropTypes.shape(caseShape).isRequired,
};
