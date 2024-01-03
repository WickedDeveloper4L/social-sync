const contactsDatabase = require("./contacts.mongo");

async function getAllContacts() {
  return await contactsDatabase.find({}, { _id: 0, __v: 0 });
}

async function saveContact(contact) {
  await contactsDatabase.findOneAndUpdate({ name: contact.name }, contact, {
    upsert: true,
  });
}

async function addNewContact(contact) {
  const newContact = Object.assign(contact);

  await saveContact(newContact);
}

module.exports = {
  getAllContacts,
  addNewContact,
};
