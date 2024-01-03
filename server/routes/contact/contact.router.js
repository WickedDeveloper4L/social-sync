const express = require("express");
const {
  httpGetAllContacts,
  httpsDeleteContact,
  httpAddNewContact,
} = require("./contact.controller");

const contactsRouter = express.Router();

contactsRouter.get("/", httpGetAllContacts);
contactsRouter.post("/", httpAddNewContact);
module.exports = contactsRouter;
