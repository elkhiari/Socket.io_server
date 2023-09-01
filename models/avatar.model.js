const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Avatar = mongoose.model("Avatar", avatarSchema);

module.exports = Avatar;
