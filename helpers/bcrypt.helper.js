const bcrypt = require("bcryptjs");

const hashPassword = (plainPassword) => {
  return new Promise((resolve, reject) => {
    resolve(bcrypt.hashSync(plainPassword, 10));
  });
};

const comparePassword = (plainPassword, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hashedPassword, function (err, result) {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = { hashPassword, comparePassword };
