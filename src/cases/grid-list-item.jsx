import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { Image, Tag } from '../components';
import { caseShape } from './model';

export default function CasesGridListItem({ wpCase }) {
  return (
    <Link
      className="block bg-f7200 h-full rounded"
      to={`/cases/${wpCase.slug}`}
    >
      <Image
        className="bg-white"
        alt={wpCase.thumbnail_image.alt}
        file={wpCase.fields.remote_thumbnail_image}
      />
      <div className="p-4 text-green-900">
        <Tag>{wpCase.sections.name}</Tag>
        <div
          className="font-900 font-title text-xl uppercase"
          dangerouslySetInnerHTML={{ __html: wpCase.customer_name }}
        />
        <div className="font-300 text-sm">{wpCase.technologies.name}</div>
      </div>
    </Link>
  );
}

CasesGridListItem.propTypes = {
  wpCase: PropTypes.shape(caseShape).isRequired,
};
