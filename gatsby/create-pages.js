const { resolve: resolvePath } = require('path');

const caseDetailTemplate = resolvePath('./src/cases/detail-template.jsx');
const jobDetailTemplate = resolvePath('./src/jobs/detail-template.jsx');
const postDetailTemplate = resolvePath('./src/posts/detail-template.jsx');

const PAGES = [
  { key: 'allWordpressWpCases', template: caseDetailTemplate },
  { key: 'allWordpressWpJobs', template: jobDetailTemplate },
  { key: 'allWordpressPost', template: postDetailTemplate },
];

module.exports = async function createPages({
  actions: { createPage },
  graphql,
}) {
  const { data, errors } = await graphql(
    `
      query {
        ${PAGES.map(
          ({ key }) => `
            ${key}(
              filter: { language: { eq: "nl" }, status: { eq: "publish" } }
            ) { nodes { path slug } }
          `,
        )}
      }
    `,
  );
  if (errors) {
    throw errors;
  }
  PAGES.forEach(({ key, template }) => {
    data[key].nodes.forEach(({ path, slug }) => {
      createPage({
        component: template,
        context: { slug },
        path,
      });
    });
  });
};
