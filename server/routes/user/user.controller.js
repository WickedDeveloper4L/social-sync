const user = require("../../models/user/user.model");
const createToken = require("../../utils/createToken");
const { hashData, verifyHashedData } = require("../../utils/hashData");

const createNewUser = async (data) => {
  try {
    const { email, password, name } = data;
    //checking if user exists
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      throw Error(`User with the ${email} already exists!`);
    }
    //hash password
    const hashedPassword = await hashData(password);
    //create user
    const newUser = new user({
      name,
      email,
      password: hashedPassword,
    });

    //Save User
    const createdUser = await newUser.save();
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const authenticateUser = async (data) => {
  try {
    const { email, password } = data;
    //checking if user is a valid account
    const fetchedUser = await user.findOne({ email });
    if (!fetchedUser) {
      throw Error("Invalid login credentials!");
    }
    const hashedPassword = fetchedUser.password;
    //checking if password match
    const passwordMatch = await verifyHashedData(password, hashedPassword);

    if (!passwordMatch) {
      throw Error("Invalid password entered!");
    }

    //create token if there as a match
    const tokenData = { userId: fetchedUser._id, email };

    const token = await createToken(tokenData);
    //assign user token
    fetchedUser.token = token;
    return fetchedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { createNewUser, authenticateUser };
