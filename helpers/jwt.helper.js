const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createAccessJWT = async (_id) => {
  try {
    const accessJWT = await jwt.sign({ _id }, process.env.JWT_ACCESS_SECRET);
    return Promise.resolve(accessJWT);
  } catch (error) {
    return Promise.reject(error);
  }
};

const verifyAccessJWT = async (userJWT) => {
  try {
    return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET));
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = { createAccessJWT, verifyAccessJWT };
