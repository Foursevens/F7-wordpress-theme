import { FormattedMessage } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { Button } from '../components';
import { jobShape } from './model';

export function JobsGridListItem({ job }) {
  return (
    <div className="p-8 sm:p-16 border-4 border-f7700 rounded w-full">
      <div className="text-center uppercase">
        <h2 className="font-700 font-title text-4xl">{job.title}</h2>
        <div className="font-700 font-title text-4xl">
          {job.requiredSkillLevel}
        </div>
        <div className="font-700 font-title text-4xl">
          {job.requiredLanguages}
        </div>
        <Button className="mt-6" to={`/jobs/${job.slug}`}>
          <FormattedMessage id="job.description" />
        </Button>
      </div>
    </div>
  );
}

JobsGridListItem.propTypes = {
  job: PropTypes.shape(jobShape).isRequired,
};
