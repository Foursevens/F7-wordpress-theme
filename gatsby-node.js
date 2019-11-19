const { resolve: resolvePath } = require('path');

const { createRemoteFileNode } = require('gatsby-source-filesystem');
const { camelCase, get, mapValues, memoize } = require('lodash/fp');

const { LOCALES } = require('./options');

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
    mapDataToContext: { author: get('blogAuthor.wordpress_id') },
    pathPrefix: '/blog',
    queryFields: 'blogAuthor { wordpress_id }',
    queryType: 'allWordpressPost',
    template: postDetailTemplate,
  },
];

const WORDPRESS_FILES = {
  wordpress__POST: [
    { source: 'heroImage' },
    { source: get('thumbnailImage.url'), target: 'thumbnailImage' },
  ],
  wordpress__wp_approach: [{ source: get('image.url'), target: 'image' }],
  wordpress__wp_cases: [
    { source: 'heroImage' },
    { source: get('thumbnailImage.url'), target: 'thumbnailImage' },
  ],
  wordpress__wp_members: [{ source: get('portret.url'), target: 'portret' }],
};

function flattenObject(object, prefix = '') {
  return Object.entries(object).reduce((acc, [key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      acc[fullKey] = value;
    } else {
      Object.assign(acc, flattenObject(value, fullKey));
    }
    return acc;
  }, {});
}

function loadMessages(language) {
  /* eslint global-require: "off", import/no-dynamic-require: "off" */
  return flattenObject(require(`./src/intl/${language}.json`));
}

const memoizeLoadMessages = memoize(loadMessages);

/**
 * @param {object} helpers gatsby node helper
 * @param {object} node gatsby node that has one or more file URLs
 * @param {object} imageMapper
 */
async function mapWpRemoteFile(helpers, node, { source, target }) {
  /* eslint no-param-reassign: "off" */
  const { createNodeField } = helpers;
  const name = camelCase(`remote ${target || source}`);
  createNodeField({ node, name });
  const url = typeof source === 'function' ? source(node) : node[source];
  if (url == null || typeof url !== 'string') {
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
          ({ queryFields = '', queryType }) => `
            ${queryType}(
              filter: { status: { eq: "publish" } }
            ) { nodes { ${queryFields} language slug } }
          `,
        )}
      }
    `,
  );
  if (errors) {
    throw errors;
  }
  PAGES.forEach(({ mapDataToContext, pathPrefix, queryType, template }) => {
    data[queryType].nodes.forEach((datum) => {
      const { language, slug } = datum;
      createPage({
        component: template,
        context: {
          ...mapValues((func) => func(datum))(mapDataToContext),
          intl: {
            language,
            languages: LOCALES,
            messages: memoizeLoadMessages(language),
            routed: true,
            originalPath: `${pathPrefix}/${slug}`,
            redirect: true, // TODO duplicated
          },
          language,
          slug,
        },
        path: `/${language}${pathPrefix}/${slug}`,
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
  const wpFileMappers = WORDPRESS_FILES[node.internal.type];
  if (wpFileMappers) {
    await Promise.all(
      wpFileMappers.map((fileMapper) =>
        mapWpRemoteFile(
          { cache, createNode, createNodeField, createNodeId, store },
          node,
          fileMapper,
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
