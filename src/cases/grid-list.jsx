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
    <ul className="flex flex-wrap -mx-3 -mt-3 mb-3">
      {filteredCases.map((wpCase) => (
        <li className="p-3 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4" key={wpCase.id}>
          <CasesGridListItem wpCase={wpCase} />
        </li>
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
