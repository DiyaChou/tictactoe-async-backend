const { hashPassword, comparePassword } = require("../helpers/bcrypt.helper");
const { createAccessJWT } = require("../helpers/jwt.helper");
const { insertUser, findUserByUsername } = require("../model/user/user.model");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);
    if (!user) throw new Error("Invalid username or password");

    const result = await comparePassword(password, user.password);

    if (!result) throw new Error("Invalid username or password");

    const accessJWT = await createAccessJWT(`${user._id}`);
    if (!accessJWT) throw new Error("error occured");
    return res.json({
      message: "Login Successfully!",
      accessJWT: accessJWT,
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, username, name } = req.body;

    const hashedPassword = await hashPassword(password);
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
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { login, register };
