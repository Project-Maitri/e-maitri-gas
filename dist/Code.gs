function doGet(e) {
  // Route to the correct page based on the `page` query parameter
  const params = e && e.parameter ? e.parameter : {};
  const page = params.page || 'index';

  // Whitelist of allowed pages (must match filenames in dist without .html)
  const allowedPages = ['index', 'about', 'privacy', 'terms'];
  const safePage = allowedPages.includes(page) ? page : 'index';

  return HtmlService.createHtmlOutputFromFile(safePage)
    .setTitle('E-Maitri')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
