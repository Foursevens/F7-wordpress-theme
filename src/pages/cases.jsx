import React from 'react';

import '../components/layout.css';

import CasesGridList from '../cases/grid-list';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default function CasesPage() {
  return (
    <Layout>
      <SEO title="Cases" />
      <div className="mainCases">
        <h3>Cases</h3>
        <CasesGridList limit={9} />
      </div>
    </Layout>
  );
}
