const User = require("../models/user.model");

const storeUser = async (username, id) => {
  try {
    const existuser = await User.find({ username });
    if (existuser.length > 0) {
      throw new Error("Username already taken");
    }
    const user = new User({ username, id });
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const deleteUser = async (id) => {
  try {
    await User.deleteOne({ id }).then((res) => {
      return { message: "User deleted" };
    });
  } catch (error) {
    new Error(error.message);
  }
};

const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    return error.message;
  }
};

const getUser = async (req, res) => {
  try {
    const username = req.params.username;
    const userExist = await User.findOne({ username });
    console.log(userExist);
    if (!userExist) {
      return res.status(200).json({ message: "username available" });
    }
    return res.status(404).json({ message: "username not available" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const checkUser = async (username) => {
  const user = await User.findOne({ username });
  if (!user) {
    return false;
  }
  return true;
};

const updateUser = async (username, id) => {
  try {
    await User.findOneAndUpdate({ username }, { id });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  storeUser,
  deleteUser,
  getUsers,
  getUser,
  checkUser,
  updateUser,
};
