const joi = require("joi");

const newUserValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(2).max(30),
    username: joi.string().min(2).max(30),
    password: joi.string().min(8).max(50),
    email: joi.string().email(),
  });

  const value = schema.validate(req.body);
  if (value.error) {
    return res.json({ message: value.error.message });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email(),
    password: joi.string().min(8).max(50),
  });

  const value = schema.validate(req.body);

  if (value.error) {
    return res.json({ message: value.error.message });
  }
  next();
};

module.exports = { newUserValidation, loginValidation };
