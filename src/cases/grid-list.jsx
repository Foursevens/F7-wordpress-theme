import PropTypes from 'prop-types';
import React from 'react';

import { caseShape } from './model';
import CasesGridListItem from './grid-list-item';

export default function CasesGridList({ cases }) {
  return (
    <div className="cases">
      {cases.map((wpCase) => (
        <CasesGridListItem caseInfo={wpCase} key={wpCase.id} />
      ))}
    </div>
  );
}

CasesGridList.propTypes = {
  cases: PropTypes.arrayOf(PropTypes.shape(caseShape).isRequired).isRequired,
};
