import classNames from 'classnames';
import { graphql } from 'gatsby';
import React from 'react';

import { Container, Hero, SEO, ShareButtons, Tag, Title } from '../components';
import { MainLayout } from '../layout';
import { locationShape } from '../model';
import styles from './detail-template.module.css';

export const query = graphql`
  query($language: String!, $slug: String!) {
    caseDetail: wordpressWpCases(
      language: { eq: $language }
      slug: { eq: $slug }
    ) {
      ...CaseBaseData
      content
      customerSite
      fields {
        remoteHeroImage {
          childImageSharp {
            fluid(maxWidth: 768) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      heroImageCopyright
    }
  }
`;

export default function CaseDetailTemplate({
  data: {
    caseDetail: {
      content,
      customerSite,
      customerName,
      fields: { remoteHeroImage },
      heroImageCopyright,
      sections,
      title,
    },
  },
  location,
}) {
  return (
    <MainLayout className="relative">
      <SEO
        article
        banner={remoteHeroImage.childImageSharp.fluid.src}
        pathname={location.pathname}
        title={title}
      />
      <Hero image={remoteHeroImage} imageCopyright={heroImageCopyright} />
      <Container>
        <Title as="h1" className="text-5xl">
          {title}
        </Title>
        <Tag>{sections.name}</Tag>
        <div className="mt-16 flex flex-wrap justify-between">
          <div
            className={classNames(
              styles.all_text,
              'md:mb-0 w-full md:w-2/3 lg:w-3/4 xl:w-4/5',
            )}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="md:mb-0 w-full md:w-1/4 lg:w-1/5 xl:w-1/6">
            <h4 className="font-700 font-title text-2xl uppercase">klant</h4>
            <p className="font-100">{customerName}</p>
            <a
              className="hover:underline hover:text-f7900 text-sm font-100"
              href={customerSite}
              rel="noopener noreferrer"
              target="_blank"
            >
              {customerSite}
            </a>
            <ShareButtons />
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}

CaseDetailTemplate.propTypes = {
  location: locationShape.isRequired,
};
