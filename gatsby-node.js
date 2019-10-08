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
          // BROWSER
          // "fluid": {
          //   "base64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAIAAABM9SnKAAAACXBIWXMAAAsSAAALEgHS3X78AAAAE0lEQVQY02OIvTyPbMQwqpk0BAC67NiR+fyw/wAAAABJRU5ErkJggg==",
          //   "aspectRatio": 3.2,
          //   "src": "/static/ebf5ee1d1312b23e556cecd874d950b5/17fa3/Hero2_4.png",
          //   "srcSet": "/static/ebf5ee1d1312b23e556cecd874d950b5/2c007/Hero2_4.png 192w,\n/static/ebf5ee1d1312b23e556cecd874d950b5/75125/Hero2_4.png 384w,\n/static/ebf5ee1d1312b23e556cecd874d950b5/17fa3/Hero2_4.png 768w,\n/static/ebf5ee1d1312b23e556cecd874d950b5/1cb33/Hero2_4.png 1152w,\n/static/ebf5ee1d1312b23e556cecd874d950b5/2513a/Hero2_4.png 1440w",
          //   "sizes": "(max-width: 768px) 100vw, 768px"
          // }
          // GATSBY-NODE
          // console.dir(fluidResult, { depth: null });
          // {
          //   base64: 'data:image/png;base64,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',
          //   aspectRatio: 0.4,
          //   src: c64463e00076698bc72bec7f9/9fff5/GenYbankingFoursevens-700x1750.png',
          //   srcSet: '/static/297a2b0c64463e00076698bc72bec7f9/4028c/GenYbankingFoursevens-700x1750.png 103w,\n/static/297a2b0c64463e00076698bc72bec7f9/fadb5/GenYbankingFoursevens-700x1750.png 205w,\n/static/297a2b0c64463e00076698bc72bec7f9/9fff5/GenYbankingFoursevens-700x1750.png 410w,\n/static/297a2b0c64463e00076698bc72bec7f9/fad88/GenYbankingFoursevens-700x1750.png 615w,\n/static/297a2b0c64463e00076698bc72bec7f9/a8200/GenYbankingFoursevens-700x1750.png 700w',
          //   srcSetType: 'image/png',
          //   sizes: '(max-width: 410px) 100vw, 410px',
          //   originalImg: '/static/297a2b0c64463e00076698bc72bec7f9/a8200/GenYbankingFoursevens-700x1750.png',
          //   originalName: 'GenYbankingFoursevens-700x1750.png',
          //   density: 72,
          //   presentationWidth: 410,
          //   presentationHeight: 1025,
          //   tracedSVG: undefined
          // }
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
