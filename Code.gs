const SHEET_NAME = "DailyExpenses";
const SHEET_ID = "1rXoXznV4mFD_UWg-becwc9sRkl9-pcdjOPP6awKy8pg"; // Your sheet ID

function doGet() {
  return HtmlService.createHtmlOutputFromFile("Index")
      .setTitle("Daily Expense Tracker");
}

// ===== UTIL =====
function getSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    // Create sheet if it doesn't exist
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Date", "Amount", "Category", "Notes"]);
  }
  return sheet;
}

// ===== ADD EXPENSE =====
function addExpense(date, amount, category, notes) {
  const sheet = getSheet();
  sheet.appendRow([new Date(date), Number(amount), category, notes]);
  return true;
}

// ===== GET EXPENSES =====
function getExpenses() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  return data.slice(1).map(row => ({
    date: row[0] instanceof Date ? Utilities.formatDate(row[0], Session.getScriptTimeZone(), "yyyy-MM-dd") : row[0],
    amount: Number(row[1]),
    category: row[2],
    notes: row[3]
  }));
}
