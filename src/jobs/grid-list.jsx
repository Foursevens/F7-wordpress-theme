import PropTypes from 'prop-types';
import React from 'react';

import { jobShape } from './model';
import JobsGridListItem from './grid-list-item';

export default function JobsGridList({ jobs }) {
  return (
    <ul className="flex flex-wrap -mx-3">
      {jobs.map((job) => (
        <li key={job.id} className="flex-grow m-3">
          <JobsGridListItem job={job} />
        </li>
      ))}
    </ul>
  );
}

JobsGridList.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape(jobShape).isRequired).isRequired,
};
