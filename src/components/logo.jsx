import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby-plugin-intl';
import React from 'react';

import Image from './image';

export default function Logo() {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      logo: file(base: { eq: "logo-full.png" }) {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      metadata: wordpressSiteMetadata(language: { eq: "nl" }) {
        name
      }
    }
  `);
  return (
    <h1>
      <Link className="inline-block -m-2 p-2 focusable" to="/">
        <Image alt={data.metadata.name} file={data.logo} loading="eager" />
      </Link>
    </h1>
  );
}
