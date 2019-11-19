import { graphql } from 'gatsby';
import { FormattedMessage } from 'gatsby-plugin-intl';
import React from 'react';

import { SEO, ShareButtons, SideBarItem } from '../components';
import { ContentDetailLayout, MainLayout } from '../layout';
import { MemberCard } from '../members';
import { locationShape } from '../model';

export const query = graphql`
  query($author: Int, $language: String!, $slug: String!) {
    author: wordpressWpMembers(wordpressId: { eq: $author }) {
      fields {
        remotePortret {
          childImageSharp {
            fluid(maxWidth: 350) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      function
      title
    }
    postDetail: wordpressPost(
      language: { eq: $language }
      slug: { eq: $slug }
    ) {
      ...PostBaseData
      category {
        slug
      }
      content
      excerpt
      fields {
        remoteHeroImage {
          childImageSharp {
            fluid(maxWidth: 768) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      video
    }
  }
`;

export default function PostDetailTemplate({
  data: {
    author,
    postDetail: {
      category: { slug: category },
      content,
      date,
      excerpt,
      fields: { remoteHeroImage },
      tag,
      title,
      video,
    },
  },
  location,
}) {
  const isVideo = category === 'video';
  const aside = author ? (
    <>
      <SideBarItem title={<FormattedMessage id="post.author" />}>
        <MemberCard member={author} shadow={false} />
      </SideBarItem>
      <ShareButtons />
    </>
  ) : null;
  return (
    <MainLayout>
      <SEO
        article
        author={author ? author.title : undefined}
        banner={
          remoteHeroImage
            ? remoteHeroImage.childImageSharp.fluid.src
            : undefined
        }
        description={excerpt}
        pathname={location.pathname}
        title={title}
      />
      <ContentDetailLayout
        aside={aside}
        centered={isVideo}
        date={date}
        hero={remoteHeroImage}
        taxonomy={tag ? tag.name : 'Article'}
        title={title}
      >
        <div dangerouslySetInnerHTML={{ __html: isVideo ? video : content }} />
      </ContentDetailLayout>
    </MainLayout>
  );
}

PostDetailTemplate.propTypes = {
  location: locationShape.isRequired,
};
