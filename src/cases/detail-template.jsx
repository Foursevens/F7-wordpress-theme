import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Link } from 'gatsby-plugin-intl';
import React from 'react';

import Layout from '../components/layout';

export const query = graphql`
  query($language: String!, $slug: String!) {
    caseDetail: wordpressWpCases(
      language: { eq: $language }
      slug: { eq: $slug }
    ) {
      ...CaseBaseData
      content
      fields {
        remote_hero_image {
          childImageSharp {
            fluid(maxWidth: 768) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default function CaseDetailTemplate({
  data: {
    caseDetail: {
      content,
      fields: { remote_hero_image },
      title,
      thumbnail_image,
    },
  },
}) {
  return (
    <Layout>
      <Link to="/cases">Cases</Link>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {remote_hero_image && (
        <Img
          alt={thumbnail_image.alt}
          fluid={remote_hero_image.childImageSharp.fluid}
        />
      )}
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}
