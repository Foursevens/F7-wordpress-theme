const { resolve: resolvePath } = require('path');

const { createRemoteFileNode } = require('gatsby-source-filesystem');

const { LOCALE_DEFAULT } = require('./options');

const caseDetailTemplate = resolvePath('./src/cases/detail-template.jsx');
const jobDetailTemplate = resolvePath('./src/jobs/detail-template.jsx');
const postDetailTemplate = resolvePath('./src/posts/detail-template.jsx');

const PAGES = [
  {
    pathPrefix: '/cases',
    queryType: 'allWordpressWpCases',
    template: caseDetailTemplate,
  },
  {
    pathPrefix: '/jobs',
    queryType: 'allWordpressWpJobs',
    template: jobDetailTemplate,
  },
  {
    pathPrefix: '/blog',
    queryType: 'allWordpressPost',
    template: postDetailTemplate,
  },
];

const WORDPRESS_FILES = {
  wordpress__POST: [{ source: 'hero_image' }],
  wordpress__wp_cases: [
    { source: 'hero_image' },
    { source: (node) => node.thumbnail_image.url, target: 'thumbnail_image' },
  ],
  wordpress__wp_members: [
    { source: (node) => node.portret.url, target: 'portret' },
  ],
};

/**
 * @param {object} helpers gatsby node helper
 * @param {object} node gatsby node that has one or more file URLs
 * @param {object} imageMapper
 */
async function mapWpRemoteFile(helpers, node, { source, target }) {
  /* eslint no-param-reassign: "off" */
  const { createNodeField } = helpers;
  const name = `remote_${target || source}`;
  createNodeField({ node, name });
  const url = typeof source === 'function' ? source(node) : node[source];
  if (url == null) {
    return;
  }
  const fileNode = await createRemoteFileNode({
    ...helpers,
    parentNodeId: node.id,
    url,
  });
  node.fields[`${name}___NODE`] = fileNode.id;
}

/**
 * Tell plugins to add pages. This extension point is called only after the
 * initial sourcing and transformation of nodes plus creation of the GraphQL
 * schema are complete so you can query your data in order to create pages.
 */
exports.createPages = async function createPages({
  actions: { createPage },
  graphql,
}) {
  const { data, errors } = await graphql(
    `
      query {
        ${PAGES.map(
          ({ queryType }) => `
            ${queryType}(
              filter: { language: { eq: "${LOCALE_DEFAULT}" }, status: { eq: "publish" } }
            ) { nodes { slug } }
          `,
        )}
      }
    `,
  );
  if (errors) {
    throw errors;
  }
  PAGES.forEach(({ pathPrefix, queryType, template }) => {
    data[queryType].nodes.forEach(({ slug }) => {
      createPage({
        component: template,
        context: { slug },
        path: `${pathPrefix}/${slug}`,
      });
    });
  });
};

/**
 * Called when a new node is created. Plugins wishing to extend or transform
 * nodes created by other plugins should implement this API.
 */
exports.onCreateNode = async function onCreateNode({
  actions: { createNode, createNodeField },
  cache,
  createNodeId,
  node,
  store,
}) {
  const wpImageMappers = WORDPRESS_FILES[node.internal.type];
  if (wpImageMappers) {
    await Promise.all(
      wpImageMappers.map((imageMapper) =>
        mapWpRemoteFile(
          { cache, createNode, createNodeField, createNodeId, store },
          node,
          imageMapper,
        ),
      ),
    );
  }
};

/**
 * Called when a new page is created. This extension API is useful for
 * programmatically manipulating pages created by other plugins.
 */
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
