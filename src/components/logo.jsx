import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { Link } from 'gatsby-plugin-intl';
import React from 'react';

export default function Logo() {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      logo: file(base: { eq: "logo.png" }) {
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
        <Img
          alt={data.metadata.name}
          loading="eager"
          fixed={data.logo.childImageSharp.fixed}
        />
      </Link>
    </h1>
  );
}
