import PropTypes from 'prop-types';
import React from 'react';

import { Grid } from '../layout';
import { CaseCard } from './card';
import { caseShape } from './model';

export function CasesGridList({ cases }) {
  return (
    <Grid>
      {cases.map((wpCase) => (
        <CaseCard key={wpCase.id} wpCase={wpCase} />
      ))}
    </Grid>
  );
}

CasesGridList.propTypes = {
  cases: PropTypes.arrayOf(PropTypes.shape(caseShape).isRequired).isRequired,
};
