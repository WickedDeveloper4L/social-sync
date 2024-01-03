const {
  getAllContacts,
  addNewContact,
} = require("../../models/contacts.model");

async function httpGetAllContacts(req, res) {
  const contacts = await getAllContacts();
  return res.status(200).json(contacts);
}

async function httpAddNewContact(req, res) {
  const contact = req.body;
  if (!contact.name || !contact.number) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }
  await addNewContact(contact);

  return res.status(201).json(contact);
}

function httpsDeleteContact() {}
module.exports = {
  httpGetAllContacts,
  httpAddNewContact,
  httpsDeleteContact,
};
