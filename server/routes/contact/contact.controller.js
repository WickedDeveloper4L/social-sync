const {
  getAllContacts,
  addNewContact,
  deleteContact,
} = require("../../models/contacts/contacts.model");

async function httpGetAllContacts(req, res) {
  try {
    const { email } = req.body;
    const contacts = await getAllContacts(email);

    console.log(contacts);
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function httpAddNewContact(req, res) {
  try {
    const { email, name, phoneNumber } = req.body;
    if (!name || !phoneNumber || !email) {
      return res.status(400).json({
        error: "Missing required properties",
      });
    }
    const contact = await addNewContact(email, name, phoneNumber);
    return res.status(200).json(contact);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
async function httpsDeleteContact(req, res) {
  try {
    const { email, _id } = req.body;
    const deletedContact = await deleteContact(email, _id);
    return res.status(200).json(deletedContact);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
module.exports = {
  httpGetAllContacts,
  httpAddNewContact,
  httpsDeleteContact,
};
