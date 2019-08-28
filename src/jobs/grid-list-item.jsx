import PropTypes from 'prop-types';
import React from 'react';

import { jobShape } from './model';

export default function JobsGridListItem({ job }) {
  return (
    <li>
      <h5 dangerouslySetInnerHTML={{ __html: job.title }} />
      <h5 dangerouslySetInnerHTML={{ __html: job.required_skill_level }} />
      <h5 dangerouslySetInnerHTML={{ __html: job.required_languages }} />
    </li>
  );
}

JobsGridListItem.propTypes = {
  job: PropTypes.shape(jobShape).isRequired,
};
