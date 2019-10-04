import classNames from 'classnames';
import { graphql } from 'gatsby';
import React from 'react';

import { Hero, Layout, ShareButtons, Tag, Title } from '../components';
import styles from './detail-template.module.css';

export const query = graphql`
  query($language: String!, $slug: String!) {
    caseDetail: wordpressWpCases(
      language: { eq: $language }
      slug: { eq: $slug }
    ) {
      ...CaseBaseData
      content
      customer_site
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
      customer_site,
      customer_name,
      fields: { remote_hero_image },
      sections,
      title,
    },
  },
}) {
  return (
    <Layout hero={<Hero image={remote_hero_image} />}>
      <Title as="h1" className="text-5xl">
        <span dangerouslySetInnerHTML={{ __html: title }} />
      </Title>
      <Tag>{sections.name}</Tag>
      <div className="mt-10 flex flex-wrap justify-between">
        <div
          className={classNames(
            styles.all_text,
            'md:mb-0 w-full md:w-2/3 lg:w-3/4 xl:w-4/5',
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="md:mb-0 w-full md:w-1/4 lg:w-1/5 xl:w-1/6">
          <h4 className="font-700 font-title text-2xl uppercase">klant</h4>
          <p className="font-100">{customer_name}</p>
          <a
            className="hover:underline hover:text-f7900 text-sm font-100"
            href={customer_site}
          >
            {customer_site}
          </a>
          <ShareButtons />
        </div>
      </div>
    </Layout>
  );
}
