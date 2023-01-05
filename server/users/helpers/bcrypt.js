const bcrypt = require("bcryptjs");

function hashPassword(password) {
  return bcrypt.hashSync(password);
}

function comparePassword(password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};

