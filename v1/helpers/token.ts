const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

function generateToken(payload: any, expiry = 60 * 15) {
  try {
    return jwt.sign(payload, process.env.jwtSecretKEY, { expiresIn: expiry });
  } catch (e) {
    console.error(e);
  }
}

function verifyToken(token: any) {
  try {
    return jwt.verify(token, process.env.jwtSecretKEY);
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      // err instanceof TokenExpiredError
      return undefined;
    }
    // err instanceof JsonWebTokenError
  }
  return false;
}

module.exports = { generateToken, verifyToken };
