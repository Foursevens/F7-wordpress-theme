import { graphql } from 'gatsby';
import React from 'react';

import { SEO, ShareButtons, SideBarItem } from '../components';
import { ContentDetailLayout, MainLayout } from '../layout';
import { locationShape } from '../model';

export const query = graphql`
  query($language: String!, $slug: String!) {
    caseDetail: wordpressWpCases(
      language: { eq: $language }
      slug: { eq: $slug }
    ) {
      ...CaseBaseData
      content
      customerSite
      date
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
      date,
      fields: { remoteHeroImage },
      heroImageCopyright,
      sections,
      title,
    },
  },
  location,
}) {
  const aside = (
    <>
      <SideBarItem title="Klant">
        <p className="font-100">{customerName}</p>
        <a
          className="hover:underline hover:text-f7900 text-sm font-100"
          href={customerSite}
          rel="noopener noreferrer"
          target="_blank"
        >
          {customerSite}
        </a>
      </SideBarItem>
      <ShareButtons />
    </>
  );
  return (
    <MainLayout className="relative">
      <SEO
        article
        banner={remoteHeroImage.childImageSharp.fluid.src}
        pathname={location.pathname}
        title={title}
      />
      <ContentDetailLayout
        aside={aside}
        date={date}
        hero={remoteHeroImage}
        heroCopyright={heroImageCopyright}
        taxonomy={sections.name}
        title={title}
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </ContentDetailLayout>
    </MainLayout>
  );
}

CaseDetailTemplate.propTypes = {
  location: locationShape.isRequired,
};
