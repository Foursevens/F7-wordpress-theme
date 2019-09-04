const { resolve: resolvePath } = require('path');

const { createRemoteFileNode } = require('gatsby-source-filesystem');

const caseDetailTemplate = resolvePath('./src/cases/detail-template.jsx');
const jobDetailTemplate = resolvePath('./src/jobs/detail-template.jsx');
const postDetailTemplate = resolvePath('./src/posts/detail-template.jsx');

const PAGES = [
  { key: 'allWordpressWpCases', template: caseDetailTemplate },
  { key: 'allWordpressWpJobs', template: jobDetailTemplate },
  { key: 'allWordpressPost', template: postDetailTemplate },
];

const WORDPRESS_IMAGES = [
  { type: 'wordpress__wp_members', fields: ['portret'] },
];

exports.createPages = async function createPages({
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

exports.onCreateNode = async function onCreateNode({
  actions: { createNode, createNodeField },
  cache,
  createNodeId,
  node,
  store,
}) {
  await Promise.all(
    WORDPRESS_IMAGES.map(async ({ type, fields }) => {
      if (node.internal.type === type) {
        await Promise.all(
          fields.map(async (field) => {
            /* eslint no-param-reassign: "off" */
            const fileNode = await createRemoteFileNode({
              cache,
              createNode,
              createNodeId,
              parentNodeId: node.id,
              store,
              url: node[field].url,
            });
            createNodeField({ node, name: field, value: fileNode });
            node[`${field}___NODE`] = fileNode.id;
          }),
        );
      }
    }),
  );
};

exports.onCreatePage = function onCreatePage({
  page,
  actions: { createPage, deletePage },
}) {
  if (!page.context.intl || page.context.language) {
    return;
  }
  deletePage(page);
  createPage({
    ...page,
    context: {
      ...page.context,
      language: page.context.intl.language,
    },
  });
};
