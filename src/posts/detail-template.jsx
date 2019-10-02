import classNames from 'classnames';
import { graphql } from 'gatsby';
import { FormattedDate, FormattedMessage } from 'gatsby-plugin-intl';
import React from 'react';

import { Hero, Layout, Tag, Title } from '../components';
import { MemberCard } from '../members';
import styles from './detail.module.css';
import ShareButtons from '../components/share-buttons';

export const query = graphql`
  query($author: Int, $language: String!, $slug: String!) {
    author: wordpressWpMembers(wordpress_id: { eq: $author }) {
      fields {
        remote_portret {
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
      video
    }
  }
`;

export default function PostDetailTemplate({
  data: {
    author,
    postDetail: { content, date, fields, tags, title, video },
  },
}) {
  return (
    <Layout hero={<Hero image={fields.remote_hero_image} />}>
      <Title as="h1" className="text-5xl">
        <span dangerouslySetInnerHTML={{ __html: title }} />
      </Title>
      <div
        className={classNames('my-6 text-gray-600', {
          'text-center': video,
          'text-center md:text-left': !video,
        })}
      >
        <Tag>{tags ? tags[0].name : 'Article'}</Tag> &ndash;{' '}
        <FormattedDate value={date} day="numeric" month="long" year="numeric" />
      </div>
      {author ? (
        <div className="flex flex-wrap sm:flex-no-wrap -mx-6">
          <div className="sm:order-2 hidden md:block mx-6">
            <h3 className="font-900 font-title mt-6 text-2xl">
              <FormattedMessage id="author" />
            </h3>
            <MemberCard member={author} shadow={false} />
            <div>
              <ShareButtons />
            </div>
          </div>
          <div
            className={classNames(
              'font-300 flex-grow mx-6 sm:order-1 text-2xl',
              styles.content,
            )}
          >
            {video && <div dangerouslySetInnerHTML={{ __html: video }} />}
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      ) : (
        <div className={classNames('text-2xl font-300', styles.content)}>
          {video && <div dangerouslySetInnerHTML={{ __html: video }} />}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
    </Layout>
  );
}
