import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { IntlContextConsumer } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import { byLanguage } from '../../utils';
import Post from './post';

export default function BlogPosts(props) {
  const { limit } = props;
  const data = useStaticQuery(graphql`
    {
      posts: allWordpressPost(
        filter: { status: { eq: "publish" } }
        sort: { fields: date, order: DESC }
      ) {
        nodes {
          id
          path
          date
          language
          title
          intro
          hero_image
          tags {
            name
          }
        }
      }
    }
  `);
  const {
    posts: { nodes: posts },
  } = data;
  return (
    <IntlContextConsumer>
      {({ language }) => (
        <div className="blogItems">
          {posts
            .filter(byLanguage(language))
            .slice(0, limit)
            .map((post) => (
              <Post postInfo={post} key={post.id} />
            ))}
        </div>
      )}
    </IntlContextConsumer>
  );
}

BlogPosts.defaultProps = {
  limit: Infinity,
};

BlogPosts.propTypes = {
  limit: PropTypes.number,
};
