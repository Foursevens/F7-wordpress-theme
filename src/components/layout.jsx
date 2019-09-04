import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import './layout.css';

export default function Layout({ children }) {
  const { wordpressSiteMetadata } = useStaticQuery(graphql`
    query LayoutQuery {
      wordpressSiteMetadata {
        name
      }
    }
  `);

  return (
    <>
      <Header siteTitle={wordpressSiteMetadata.name} />
      <div className="container mx-auto p-6">
        <main>{children}</main>
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
