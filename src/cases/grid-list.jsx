import PropTypes from 'prop-types';
import React from 'react';

import { caseShape } from './model';
import CasesGridListItem from './grid-list-item';

export default function CasesGridList({ cases, selectedSections }) {
  const filteredCases =
    selectedSections == null || selectedSections.length === 0
      ? cases
      : cases.filter(
          ({ sections }) =>
            sections && selectedSections.includes(sections.name),
        );
  return (
    <ul>
      {filteredCases.map((wpCase) => (
        <CasesGridListItem wpCase={wpCase} key={wpCase.id} />
      ))}
    </ul>
  );
}

CasesGridList.defaultProps = {
  selectedSections: undefined,
};

CasesGridList.propTypes = {
  cases: PropTypes.arrayOf(PropTypes.shape(caseShape).isRequired).isRequired,
  selectedSections: PropTypes.arrayOf(PropTypes.string),
};
