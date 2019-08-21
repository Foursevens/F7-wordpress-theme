import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';

import React from 'react';

export default function Post(props) {
  const { postInfo } = props;
  return (
    <Link to={`/${postInfo.path}`}>
      <div key={postInfo.id} className="post">
        {postInfo.hero_image === null ? (
          <img
            src="https://dummyimage.com/400x300/000/fff&text=Thumbnail+image"
            alt={`Foursevens blog ${postInfo.title}`}
          />
        ) : (
          <img
            src={`${postInfo.hero_image}`}
            alt={`Foursevens blog ${postInfo.title}`}
          />
        )}
        <p>
          {postInfo.tags === null ? (
            <span>Article</span>
          ) : (
            <span>{postInfo.tags[0].name}</span>
          )}
          <span>{new Date(postInfo.date).toLocaleDateString()}</span>
        </p>
        <h3 dangerouslySetInnerHTML={{ __html: postInfo.title }} />
        <p dangerouslySetInnerHTML={{ __html: postInfo.intro }} />
      </div>
    </Link>
  );
}
Post.propTypes = {
  postInfo: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};
