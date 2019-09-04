import PropTypes from 'prop-types';
import React from 'react';

import { caseShape } from './model';
import CasesGridListItem from './grid-list-item';

export default function CasesGridList({ cases }) {
  return (
    <ul>
      {cases.map((wpCase) => (
        <CasesGridListItem wpCase={wpCase} key={wpCase.id} />
      ))}
    </ul>
  );
}

CasesGridList.propTypes = {
  cases: PropTypes.arrayOf(PropTypes.shape(caseShape).isRequired).isRequired,
};
