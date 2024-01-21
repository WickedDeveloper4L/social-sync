const user = require("../user/user.model");
const contactsDatabase = require("./contacts.mongo");

async function getAllContacts(email) {
  try {
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      throw Error("Unauthorized request to get contacts.");
    }
    const contactList = existingUser.contacts;
    return contactList;
  } catch (error) {
    throw error;
  }
}

async function saveContact(email, name, phoneNumber) {
  try {
    // const existingUser = await user.findOne({ email });

    const contact = await user.findOneAndUpdate(
      { email },
      { $push: { contacts: { contactName: name, phoneNumber: phoneNumber } } }
    );
    if (!contact) {
      throw Error("Invalid request!");
    }
    const savedContact = contact.save();
    return savedContact;
  } catch (error) {
    throw error;
  }
}

async function addNewContact(email, name, phoneNumber) {
  try {
    const savedContact = await saveContact(email, name, phoneNumber);

    return savedContact;
  } catch (error) {
    throw error;
  }
}

async function deleteContact(email, _id) {
  try {
    const deletedContact = await user.findOneAndUpdate(
      { email },
      {
        $pull: {
          contacts: { _id },
        },
      }
    );
    if (!deletedContact) {
      throw Error("Invalid User");
    }
    return deletedContact;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getAllContacts,
  addNewContact,
  deleteContact,
};
