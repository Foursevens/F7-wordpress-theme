import PropTypes from 'prop-types';
import React from 'react';

import { Grid } from '../layout';
import CaseCard from './card';
import { caseShape } from './model';

export default function CasesGridList({ cases, selectedSections }) {
  const filteredCases =
    selectedSections == null || selectedSections.length === 0
      ? cases
      : cases.filter(
          ({ sections }) =>
            sections && selectedSections.includes(sections.name),
        );
  return (
    <Grid>
      {filteredCases.map((wpCase) => (
        <CaseCard key={wpCase.id} wpCase={wpCase} />
      ))}
    </Grid>
  );
}

CasesGridList.defaultProps = {
  selectedSections: undefined,
};

CasesGridList.propTypes = {
  cases: PropTypes.arrayOf(PropTypes.shape(caseShape).isRequired).isRequired,
  selectedSections: PropTypes.arrayOf(PropTypes.string),
};
