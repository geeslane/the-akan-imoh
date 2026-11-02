/**
 * Receives feature, sponsorship, advertising, partnership, and booking enquiries.
 *
 * 1. Add a sheet tab named Enquiries.
 * 2. Put this header in row 1:
 *    Submitted | Name | Email | Organisation | Role | Intent | Message
 * 3. Extensions → Apps Script, paste this file, and set SHEET_ID.
 * 4. Deploy → New deployment → Web app.
 *    Execute as: Me. Who has access: Anyone.
 * 5. Copy the web app URL into ENQUIRY_WEBHOOK_URL.
 */
var SHEET_ID = "PASTE_THE_SHEET_ID";

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Enquiries");
  sheet.appendRow([
    data.submittedAt || new Date(),
    data.name || "",
    data.email || "",
    data.organisation || "",
    data.role || "",
    data.intent || "",
    data.message || "",
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON,
  );
}
