const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
});

module.exports = mongoose.model("contact", contactsSchema);
