const { resolve: resolvePath } = require('path');

const Img = require('gatsby-image').default;
const { fluid } = require('gatsby-plugin-sharp');
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const { get, mapValues, memoize } = require('lodash/fp');
const parse5 = require('parse5');
const React = require('react');
const ReactDomSsr = require('react-dom/server');

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
    mapDataToContext: { author: get('blog_author.wordpress_id') },
    pathPrefix: '/blog',
    queryFields: 'blog_author { wordpress_id }',
    queryType: 'allWordpressPost',
    template: postDetailTemplate,
  },
];

const WORDPRESS_FILES = {
  wordpress__POST: [
    { mode: 'html', source: 'content', target: 'content_images' },
    { mode: 'url', source: 'hero_image' },
    {
      mode: 'url',
      source: get('thumbnail_image.url'),
      target: 'thumbnail_image',
    },
  ],
  wordpress__wp_cases: [
    { mode: 'url', source: 'hero_image' },
    {
      mode: 'url',
      source: get('thumbnail_image.url'),
      target: 'thumbnail_image',
    },
  ],
  wordpress__wp_members: [
    { mode: 'url', source: get('portret.url'), target: 'portret' },
  ],
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
async function mapWpRemoteFiles(helpers, node, { mode, source, target }) {
  /* eslint no-param-reassign: "off" */
  const { cache, createNodeField, reporter } = helpers;
  const fieldName = `remote_${target || source}`;
  createNodeField({ node, name: fieldName });
  switch (mode) {
    default:
      throw new Error('Unknown mode');
    case 'html': {
      const imageTags = node.content.match(/<img [^>]+\/?>/gm);
      if (!imageTags) {
        return;
      }
      const images = imageTags.map(parse5.parse).map((rootNode) => {
        const image = rootNode.childNodes[0].childNodes[1].childNodes[0];
        return image.attrs.reduce((acc, { name, value }) => {
          acc[name] = value;
          return acc;
        }, {});
      });
      const fileNodes = await Promise.all(
        images.map(async ({ src }) => {
          if (!src) {
            return null;
          }
          const absoluteUrl =
            src[0] === '/' ? `https://foursevens.be${src}` : src;
          return createRemoteFileNode({
            ...helpers,
            parentNodeId: node.id,
            url: absoluteUrl,
          });
        }),
      );
      await Promise.all(
        imageTags.map(async (imageTag, index) => {
          const image = images[index];
          const fileNode = fileNodes[index];
          if (!fileNode) {
            return;
          }
          const fluidResult = await fluid({
            file: fileNode,
            args: { maxWidth: image.width || 768 },
            reporter,
            cache,
          });
          const imgOptions = {
            fluid: fluidResult,
            style: { width: image.width },
          };
          const imageJsxElement = React.createElement(Img, imgOptions, null);
          const fluidImageHtml = ReactDomSsr.renderToString(imageJsxElement);
          node.content = node.content.replace(imageTag, fluidImageHtml);
        }),
      );
      return;
    }
    case 'url': {
      const url = typeof source === 'function' ? source(node) : node[source];
      if (url == null) {
        return;
      }
      const fileNode = await createRemoteFileNode({
        ...helpers,
        parentNodeId: node.id,
        url,
      });
      node.fields[`${fieldName}___NODE`] = fileNode.id;
    }
  }
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
  const wpImageMappers = WORDPRESS_FILES[node.internal.type];
  if (wpImageMappers) {
    await Promise.all(
      wpImageMappers.map((imageMapper) =>
        mapWpRemoteFiles(
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
