const { resolve: resolvePath } = require('path');

const casePageTemplate = resolvePath('src/templates/case.jsx');

exports.createPages = async function createPages({
  actions: { createPage },
  graphql,
}) {
  const {
    data: { allWordpressWpCases },
    errors,
  } = await graphql(
    `
      query {
        allWordpressWpCases(filter: { status: { eq: "publish" } }) {
          nodes {
            path
            slug
          }
        }
      }
    `,
  );
  if (errors) {
    throw errors;
  }
  allWordpressWpCases.nodes.forEach(({ path, slug }) => {
    createPage({
      path,
      component: casePageTemplate,
      context: { slug },
    });
  });
};
