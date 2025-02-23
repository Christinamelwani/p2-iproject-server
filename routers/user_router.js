const express = require("express");
const userController = require("../controllers/user_controller");
const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

module.exports = userRouter;
