function doGet(e) {
  // Route to the correct page based on the `page` query parameter
  const params = e && e.parameter ? e.parameter : {};
  const page = params.page || 'index';

  // Whitelist of allowed pages (must match filenames in dist without .html)
  const allowedPages = ['index', 'about', 'privacy', 'terms', 'login', 'register'];
  const safePage = allowedPages.includes(page) ? page : 'index';

  return HtmlService.createHtmlOutputFromFile(safePage)
    .setTitle('E-Maitri')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// --- GOOGLE SHEETS DATABASE CONFIG ---
const SPREADSHEET_ID = '145_m_h17UfV8-T-A-jW1uHq_XpS7JpT'; // Replace with your actual ID if needed
const SHEET_NAME = 'E-Maitri_SignUp';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Full Name', 'Mobile', 'Email', 'Village/Ward', 'Password']);
    }

    // Append the user data
    sheet.appendRow([
      new Date(),
      data.name,
      data.mobile,
      data.email,
      data.village,
      data.password
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
