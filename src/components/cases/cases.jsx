import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Case from './case'
import PropTypes from 'prop-types';

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
      <Case caseInfo={wpCase} key={wpCase.id}/>
      ))}
    </div>
  );
}
Cases.propTypes = {
  limit: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};
