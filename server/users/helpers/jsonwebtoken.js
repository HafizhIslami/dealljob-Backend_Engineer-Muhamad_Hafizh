const jwt = require("jsonwebtoken");
const secretKey = "THIS_IS_A_SECRET";
const secretRefreshKey = "THIS_IS_A_REFRESH_SECRET"

function createToken(payload) {
  return jwt.sign(payload, secretKey);
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

function createRefreshToken(payload, time) {
  return jwt.sign(payload, secretKey, { expiresIn: time });
}

module.exports = {
  createToken,
  verifyToken,
  createRefreshToken,
};