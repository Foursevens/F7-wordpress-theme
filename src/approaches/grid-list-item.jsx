import classNames from 'classnames';
import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { useBreakpoint } from '../breakpoint';
import { approachShape } from './model';

const BLOCK_HEIGHT = { xs: 10, sm: 20, md: 50, lg: 150, xl: 150 };

export default function ApproachesGridListItem({ approach, color }) {
  const breakpoint = useBreakpoint();
  return (
    <div className="bg-white h-full text-center">
      <Link className="block p-6" to="/approach">
        <span
          className={classNames('inline-block my-3', color)}
          style={{ width: 150, height: BLOCK_HEIGHT[breakpoint] }}
        />
        <h3
          className="font-900 font-title my-6 text-xl uppercase"
          dangerouslySetInnerHTML={{ __html: approach.title }}
        />
        <p
          className="font-100 my-3"
          dangerouslySetInnerHTML={{
            __html: approach.approach_intro || approach.approach_text,
          }}
        />
      </Link>
    </div>
  );
}

ApproachesGridListItem.propTypes = {
  approach: PropTypes.shape(approachShape).isRequired,
  color: PropTypes.string.isRequired,
};
