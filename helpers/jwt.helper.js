const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
console.log("process.env.JWT_ACCESS_SECRET", process.env.JWT_ACCESS_SECRET);

const createAccessJWT = async (email, _id) => {
  try {
    const accessJWT = await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET);
    return Promise.resolve(accessJWT);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = { createAccessJWT };
