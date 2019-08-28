/* eslint no-param-reassign: "off" */

const { createRemoteFileNode } = require('gatsby-source-filesystem');

const WORDPRESS_IMAGES = [
  { type: 'wordpress__wp_members', fields: ['portret'] },
];

module.exports = async function onCreateNode({
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
