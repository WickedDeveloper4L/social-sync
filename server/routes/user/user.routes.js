const express = require("express");
const { createNewUser, authenticateUser } = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    let { email, name, password } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    if (!(name && email && password)) {
      throw Error("empty input fields!");
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
      throw Error("Invalid Name entered!");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error("invalid email!");
    } else if (password.length < 8) {
      throw Error("password is too short!");
    } else {
      //good credentials, create new user
      const newUser = await createNewUser({
        name,
        email,
        password,
      });
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

userRouter.post("/", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    //Making sure the needed details are provided
    if (!(email && password)) {
      throw Error("Provide email and password to login!");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error("invalid email!");
    } else if (password.length < 8) {
      throw Error("wrong password structure!");
    }
    const authenticatedUser = await authenticateUser({ email, password });
    res.status(200).json(authenticatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = userRouter;
