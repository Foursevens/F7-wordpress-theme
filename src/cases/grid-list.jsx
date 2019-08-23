import PropTypes from 'prop-types';
import React from 'react';

import { caseShape } from './model';
import CasesGridListItem from './grid-list-item';

export default function CasesGridList({ cases }) {
  return (
    <ul className="cases">
      {cases.map((wpCase) => (
        <CasesGridListItem caseInfo={wpCase} key={wpCase.id} />
      ))}
    </ul>
  );
}

CasesGridList.propTypes = {
  cases: PropTypes.arrayOf(PropTypes.shape(caseShape).isRequired).isRequired,
};
