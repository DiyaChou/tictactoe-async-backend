const { UserSchema } = require("./user.schema");

const insertUser = (body) => {
  return new Promise((resolve, reject) => {
    try {
      UserSchema.create(body)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const findUserById = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      UserSchema.findById(_id)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    try {
      UserSchema.findOne({ email })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { insertUser, findUserById, findUserByEmail };
