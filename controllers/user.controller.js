const { hashPassword, comparePassword } = require("../helpers/bcrypt.helper");
const { createAccessJWT } = require("../helpers/jwt.helper");
const { findUserByEmail, insertUser } = require("../model/user/user.model");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user._id) throw "Invalid email or password";

    const result = await comparePassword(password, user.password);

    if (!result) throw "Invalid email or password";

    const accessJWT = await createAccessJWT(user.email, `${user._id}`);
    console.log("accessJWT", accessJWT);
    if (!accessJWT) throw new Error("error occured");
    return res.json({
      message: "Login Successfully!",
      accessJWT: accessJWT,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, username, name } = req.body;

    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);
    const user = await insertUser({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.json({
      message: "User Created Successfully",
      user: { email: user.email },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: error.message,
    });
  }
};

module.exports = { login, register };
