const Avatar = require("../models/avatar.model");

const storeAvatar = async (req, res) => {
  try {
    const { url } = req.body;
    const newAvatar = new Avatar({ url });
    await newAvatar.save();
    return res.status(201).json(newAvatar);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAvatar = async (req, res) => {
  try {
    const Avatars = await Avatar.find();
    return res.status(200).json(Avatars);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { storeAvatar, getAvatar };
