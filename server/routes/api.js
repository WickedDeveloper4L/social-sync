const express = require("express");

const contactsRouter = require("./contact/contact.router");

const api = express.Router();

api.use("/dashboard", contactsRouter);

module.exports = api;
