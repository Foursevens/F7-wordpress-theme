import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { jobShape } from './model';

export default function JobsGridListItem({ job }) {
  return (
    <li>
      <Link to={`/jobs/${job.slug}`}>
        <h2 dangerouslySetInnerHTML={{ __html: job.title }} />
      </Link>
      <p dangerouslySetInnerHTML={{ __html: job.required_skill_level }} />
      <p dangerouslySetInnerHTML={{ __html: job.required_languages }} />
    </li>
  );
}

JobsGridListItem.propTypes = {
  job: PropTypes.shape(jobShape).isRequired,
};
