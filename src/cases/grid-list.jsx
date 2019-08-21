import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';

import CaseGridListItem from './grid-list-item';

export default function Cases(props) {
  const { limit } = props;
  const data = useStaticQuery(graphql`
    query {
      cases: allWordpressWpCases(filter: { status: { eq: "publish" } }) {
        nodes {
          id
          path
          sections {
            name
          }
          title
          technologies {
            name
          }
          thumbnail_image {
            url
            alt
            sizes {
              medium_height
              medium_width
            }
          }
          type
        }
      }
    }
  `);
  const {
    cases: { nodes: cases },
  } = data;

  return (
    <div className="cases">
      {cases.splice(0, limit).map((wpCase) => (
        <CaseGridListItem caseInfo={wpCase} key={wpCase.id} />
      ))}
    </div>
  );
}

Cases.defaultProps = {
  limit: Infinity,
};

Cases.propTypes = {
  limit: PropTypes.number,
};
