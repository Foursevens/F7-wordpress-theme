import { graphql } from 'gatsby';
import { Link } from 'gatsby-plugin-intl';
import React from 'react';

import Image from '../components/image';
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
      <Image alt={thumbnail_image.alt} file={remote_hero_image} />
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}
