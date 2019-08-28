const { resolve: resolvePath } = require('path');

const caseDetailTemplate = resolvePath('./src/cases/detail-template.jsx');
const jobDetailTemplate = resolvePath('./src/jobs/detail-template.jsx');
const postDetailTemplate = resolvePath('./src/posts/detail-template.jsx');

module.exports = async function createPages({
  actions: { createPage },
  graphql,
}) {
  function createWPPages(nodes, component) {
    nodes.forEach(({ path, slug }) => {
      createPage({
        path,
        component,
        context: { slug },
      });
    });
  }
  const {
    data: { allWordpressWpCases, allWordpressWpJobs, allWordpressPost },
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
        allWordpressWpJobs(filter: { status: { eq: "publish" } }) {
          nodes {
            path
            slug
          }
        }
        allWordpressPost(filter: { status: { eq: "publish" } }) {
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
  createWPPages(allWordpressPost.nodes, postDetailTemplate);
  createWPPages(allWordpressWpCases.nodes, caseDetailTemplate);
  createWPPages(allWordpressWpJobs.nodes, jobDetailTemplate);
};
