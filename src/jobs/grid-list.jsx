import PropTypes from 'prop-types';
import React from 'react';

import { jobShape } from './model';
import JobsGridListItem from './grid-list-item';

export default function JobsGridList({ jobs }) {
  return (
    <ul>
      {jobs.map((job) => (
        <JobsGridListItem job={job} key={job.id} />
      ))}
    </ul>
  );
}

JobsGridList.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape(jobShape).isRequired).isRequired,
};
