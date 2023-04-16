const bcrypt = require("bcrypt");

function encrypt(text: any) {
  try {
    return bcrypt.hashSync(text, 10);
  } catch (e) {
    console.error(e);
  }
  return;
}

function compare(text: any, encodedText: any) {
  try {
    return bcrypt.compareSync(text, encodedText);
  } catch (e) {
    console.error(e);
  }
  return false;
}

module.exports = { encrypt, compare };
