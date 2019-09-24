const { LOCALE_DEFAULT } = require('./options');

function cleanEntity(baseEntity) {
  switch (baseEntity.__type) {
    default:
      return baseEntity;
    case 'wordpress__POST':
      return cleanPost(baseEntity);
  }
}

function cleanPost({ featured_image_src, tag, thumbnail_image, ...rest }) {
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
    typeof featured_image_src === 'string' ? { featured_image_src } : null,
    typeof tag === 'object' ? { tag } : null,
    typeof thumbnail_image === 'object' ? { thumbnail_image } : null,
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
