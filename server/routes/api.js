const express = require("express");

const contactsRouter = require("./contact/contact.router");
const userRouter = require("./user/user.routes");

const api = express.Router();

api.use("/dashboard", contactsRouter);
api.use("/authenticate", userRouter);
module.exports = api;
