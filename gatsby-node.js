const { resolve: resolvePath } = require('path');

const { createRemoteFileNode } = require('gatsby-source-filesystem');

const caseDetailTemplate = resolvePath('./src/cases/detail-template.jsx');
const postDetailTemplate = resolvePath('./src/posts/detail-template.jsx');

const WORDPRESS_IMAGES = [
  { type: 'wordpress__wp_members', fields: ['portret'] },
];

exports.createPages = async function createPages({
  actions: { createPage },
  graphql,
}) {
  const {
    data: { allWordpressWpCases, allWordpressPost },
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
  allWordpressWpCases.nodes.forEach(({ path, slug }) => {
    createPage({
      path,
      component: caseDetailTemplate,
      context: { slug },
    });
  });
  allWordpressPost.nodes.forEach(({ path, slug }) => {
    createPage({
      path,
      component: postDetailTemplate,
      context: { slug },
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
  /* eslint no-param-reassign: "off" */
  await Promise.all(
    WORDPRESS_IMAGES.map(async ({ type, fields }) => {
      if (node.internal.type === type) {
        await Promise.all(
          fields.map(async (field) => {
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

exports.onCreatePage = ({ page, actions: { createPage, deletePage } }) => {
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
