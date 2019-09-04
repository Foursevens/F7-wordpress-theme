const { resolve: resolvePath } = require('path');

const { createRemoteFileNode } = require('gatsby-source-filesystem');

const caseDetailTemplate = resolvePath('./src/cases/detail-template.jsx');
const jobDetailTemplate = resolvePath('./src/jobs/detail-template.jsx');
const postDetailTemplate = resolvePath('./src/posts/detail-template.jsx');

const PAGES = [
  {
    key: 'allWordpressWpCases',
    pathPrefix: '/cases',
    template: caseDetailTemplate,
  },
  {
    key: 'allWordpressWpJobs',
    pathPrefix: '/jobs',
    template: jobDetailTemplate,
  },
  {
    key: 'allWordpressPost',
    pathPrefix: '/blog',
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
 *
 * @param {object} context gatsby internals
 * @param {object} node gatsby node that has one or more file URLs
 * @param {*} param2
 */
async function mapWpRemoteFile(context, node, { source, target }) {
  /* eslint no-param-reassign: "off" */
  const { createNodeField } = context;
  const name = `remote_${target || source}`;
  createNodeField({ node, name });
  const url = typeof source === 'function' ? source(node) : node[source];
  if (url == null) {
    return;
  }
  const fileNode = await createRemoteFileNode({
    ...context,
    parentNodeId: node.id,
    url,
  });
  node.fields[`${name}___NODE`] = fileNode.id;
}

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
            ) { nodes { slug } }
          `,
        )}
      }
    `,
  );
  if (errors) {
    throw errors;
  }
  PAGES.forEach(({ key, pathPrefix, template }) => {
    data[key].nodes.forEach(({ slug }) => {
      createPage({
        component: template,
        context: { slug },
        path: `${pathPrefix}/${slug}`,
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
  const wpImageMappers = WORDPRESS_FILES[node.internal.type];
  if (wpImageMappers) {
    await Promise.all(
      wpImageMappers.map((mapper) =>
        mapWpRemoteFile(
          { cache, createNode, createNodeField, createNodeId, store },
          node,
          mapper,
        ),
      ),
    );
  }
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
