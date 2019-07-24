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
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
