const { camelCase, mapKeys } = require('lodash/fp');

const { LOCALE_DEFAULT } = require('./options');

const camelCaseKeys = mapKeys((key) => (key[0] === '_' ? key : camelCase(key)));

function cleanEntity(baseEntity) {
  const cleanEnity = camelCaseKeys(baseEntity);
  switch (cleanEnity.__type) {
    default:
      return cleanEnity;
    case 'wordpress__POST':
      return cleanPost(cleanEnity);
  }
}

function cleanPost({ featuredImageSrc, tag, thumbnailImage, ...rest }) {
  // wordpress__POST.taxonomies.rest_base:
  // - type: boolean
  //   value: false
  // - type: string
  //   value: 'categories'
  // wordpress__POST.taxonomies.rest_controller_class:
  // - type: boolean
  //   value: false
  // - type: string
  //   value: 'WP_REST_Terms_Controller'
  return Object.assign(
    rest,
    typeof featuredImageSrc === 'string' ? { featuredImageSrc } : null,
    typeof tag === 'object' ? { tag } : null,
    typeof thumbnailImage === 'object' ? { thumbnailImage } : null,
  );
}

module.exports = function wpNormalize(language) {
  return ({ entities }) =>
    entities.map((baseEntity) => {
      const entity = Object.assign(cleanEntity(baseEntity), { language });
      if (entity.path && language !== LOCALE_DEFAULT) {
        // All non default languages have a Wordpress path prefix like
        // '/fr' or '/en'. We don't need this as localisation is handled
        // by gatsby-plugin-intl. So we strip it here.
        entity.path = entity.path.replace(/\/.{2}/, '');
      }
      return entity;
    });
};
