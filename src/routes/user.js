const express = require('express');
const UserController = require('../controller/user');
const checkAuth = require('../middleware/auth-check')
const userRouter = express.Router()

userRouter.get("/delete-user", checkAuth, UserController.deleteUser);
userRouter.post("/update-user", checkAuth, UserController.updateUser);
userRouter.post("/update-all-user", checkAuth, UserController.updateAllUser);
userRouter.post("/update-all", checkAuth, UserController.updateAll);
userRouter.get("/users", checkAuth, UserController.users);

module.exports = userRouter;