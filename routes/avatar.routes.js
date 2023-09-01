const express = require("express");
const AvatarRouter = express.Router();
const { getAvatar, storeAvatar } = require("../controllers/avatar.controller");
const { getUser } = require("../controllers/user.controller");

AvatarRouter.route("/").get(getAvatar).post(storeAvatar);


module.exports = AvatarRouter;
