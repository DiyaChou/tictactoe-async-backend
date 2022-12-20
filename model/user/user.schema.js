const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

schema.index({ email: 1 }, { unique: true });

module.exports = { UserSchema: mongoose.model("users", schema) };
