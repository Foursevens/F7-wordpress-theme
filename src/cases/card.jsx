import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { Image, Tag } from '../components';
import { caseShape } from './model';

export default function CaseCard({ wpCase }) {
  return (
    <Link
      className="block bg-f7200 h-full rounded"
      to={`/cases/${wpCase.slug}`}
    >
      <Image
        alt={wpCase.thumbnailImage.alt}
        className="bg-white"
        file={wpCase.fields.remoteThumbnailImage}
      />
      <div className="p-4 text-green-900">
        <Tag>{wpCase.sections.name}</Tag>
        <div className="font-900 font-title text-xl uppercase">
          {wpCase.customerName}
        </div>
        <div className="font-300 text-sm">{wpCase.technologies.name}</div>
      </div>
    </Link>
  );
}

CaseCard.propTypes = {
  wpCase: PropTypes.shape(caseShape).isRequired,
};
