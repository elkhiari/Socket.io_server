const Message = require("../models/message.model.js");

const storeMessage = async (message) => {
  try {
    const { username, text } = message;
    const newmessage = new Message({ username, text });
    await newmessage.save();
    return message;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const getMessages = async () => {
  try {
    const messages = await Message.find();
    return messages;
  } catch (error) {
    return error.message;
  }
};

module.exports = { storeMessage, getMessages };
