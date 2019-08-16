import { graphql } from 'gatsby';
import { injectIntl } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../components/layout';

export const query = graphql`
  query($slug: String!) {
<<<<<<< HEAD
    allWordpressWpCases(filter: { slug: { eq: $slug } }) {
      nodes {
        content
        language
        title
      }
=======
    wpCase: wordpressWpCases(slug: { eq: $slug }) {
      content
      title
      hero_image
>>>>>>> Chore: Solving lint errors and removing unnecessary code
    }
  }
`;

function CasePageTemplate({
  data: {
<<<<<<< HEAD
    allWordpressWpCases: { nodes: cases },
=======
    // eslint-disable-next-line camelcase
    wpCase: { content, title, hero_image },
>>>>>>> Chore: Solving lint errors and removing unnecessary code
  },
  intl,
}) {
  const { content, title } = cases.find(
    ({ language }) => language === intl.locale,
  );
  return (
    <Layout>
      <h2>{title}</h2>
      {/* eslint-disable-next-line camelcase */}
      <img src={hero_image} alt={`Foursevens ${title}`} />
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}

CasePageTemplate.propTypes = {
<<<<<<< HEAD
  intl: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
=======
  data: PropTypes.shape({
    wpCase: PropTypes.shape({
      content: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      hero_image: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
>>>>>>> Chore: Solving lint errors and removing unnecessary code
};

export default injectIntl(CasePageTemplate);
