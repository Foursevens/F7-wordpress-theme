import { FormattedMessage, Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { jobShape } from './model';

export default function JobsGridListItem({ job }) {
  return (
    <div className="p-8 sm:p-16 border-4 border-f7700 rounded w-full">
      <div className="text-center uppercase">
        <h2
          className="font-bold font-title text-4xl"
          dangerouslySetInnerHTML={{ __html: job.title }}
        />
        <div
          className="font-bold font-title text-4xl"
          dangerouslySetInnerHTML={{ __html: job.required_skill_level }}
        />
        <div
          className="font-bold font-title text-4xl"
          dangerouslySetInnerHTML={{ __html: job.required_languages }}
        />
        <Link
          className="inline-block font-black mt-10 hover:bg-f7300 border-2 border-f7300 py-3 px-8 rounded"
          to={`/jobs/${job.slug}`}
        >
          <FormattedMessage id="job.description" />
        </Link>
      </div>
    </div>
  );
}

JobsGridListItem.propTypes = {
  job: PropTypes.shape(jobShape).isRequired,
};
