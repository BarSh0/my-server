const { google } = require('googleapis');

serialNumber = 'sPVpymp9';

const serialNumberCheck = async (serialNumber, email) => {
  const updateSubmitted = async (num) => {
    await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `1000_unique_codes!C${parseInt(num.Number) + 1}`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [['TRUE']],
      },
    });
  };
  const updateEmail = async (num, email) => {
    await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `1000_unique_codes!E${parseInt(num.Number) + 1}`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[email]],
      },
    });
  };
  const updateAttempts = async (num) => {
    await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `1000_unique_codes!D${parseInt(num.Number) + 1}`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[parseInt(num.Attempts) + 1]],
      },
    });
  };
  function convertRowsToObjectArray(rows) {
    const keys = rows[0];
    return rows.slice(1).map((row, index) => {
      const obj = {};
      keys.forEach((key, i) => {
        obj[key] = row[i];
      });
      return obj;
    });
  }
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });
  const client = await auth.getClient();

  const sheets = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = '1RWAlfTLb4mVOwpp1inagd67ugDZfgCAkWzkiWEZyeps';

  const getRows = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: '1000_unique_codes',
  });

  const data = convertRowsToObjectArray(getRows.data.values);
  const serialFromData = data.find((d) => d.SerialNumber === serialNumber);
  const usedEmail = data.find((d) => d.Email === email);

  if (!serialFromData) {
    // serial number not found
    return false;
  }

  if (usedEmail) {
    // email already used
    return false;
  }

  if (serialFromData.isSubmitted === 'TRUE') {
    // serial number already submitted
    updateAttempts(serialFromData);
    return false;
  }

  updateEmail(serialFromData, email);
  updateSubmitted(serialFromData);

  return true;
};

module.exports = { serialNumberCheck };
