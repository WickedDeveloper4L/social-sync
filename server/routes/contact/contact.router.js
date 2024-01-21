const express = require("express");
const {
  httpGetAllContacts,
  httpsDeleteContact,
  httpAddNewContact,
} = require("./contact.controller");

const contactsRouter = express.Router();

contactsRouter.post("/", httpGetAllContacts);
contactsRouter.post("/new", httpAddNewContact);
contactsRouter.delete("/", httpsDeleteContact);
module.exports = contactsRouter;
