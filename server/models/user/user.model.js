const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: String,
  verified: { type: Boolean, default: false },
  contacts: [{ contactName: String, phoneNumber: String }],
});

const user = mongoose.model("user", userSchema);

module.exports = user;
