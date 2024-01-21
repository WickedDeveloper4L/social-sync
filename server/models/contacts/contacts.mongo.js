const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
});

const contact = mongoose.model("contact", contactsSchema);

module.exports = contact;
