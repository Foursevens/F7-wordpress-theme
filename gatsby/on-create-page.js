module.exports = function onCreatePage({
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
