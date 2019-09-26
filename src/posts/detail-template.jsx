import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Image from '../components/image';
import Layout from '../components/layout';
import { memberShape } from '../members/model';

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

function Author({
  author: {
    fields: { remote_portret },
    function: functionTitle,
    title,
  },
}) {
  return (
    <div style={{ float: 'right', width: '250px' }}>
      <h3>Author</h3>
      <Image alt={title} file={remote_portret} />
      <div>{title}</div>
      <div>{functionTitle}</div>
    </div>
  );
}

Author.propTypes = {
  author: PropTypes.shape(memberShape).isRequired,
};

export default function PostDetailTemplate({
  data: {
    author,
    postDetail: { content, fields, title, video },
  },
}) {
  return (
    <Layout>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      <Image file={fields.remote_hero_image} />
      {author && <Author author={author} />}
      {video && <div dangerouslySetInnerHTML={{ __html: video }} />}
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}
