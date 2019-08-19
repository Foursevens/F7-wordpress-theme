import React from 'react';
import Layout from '../components/layout';
import '../components/layout.css';
import Cases from '../components/cases/cases';
import SEO from '../components/seo';

const CasesPage = () => {
  return (
    <Layout>
      <SEO title="Cases" />
      <div className="mainCases">
        <h3>Cases</h3>
        <Cases limit={9} />
      </div>
    </Layout>
  );
};

export default CasesPage;
