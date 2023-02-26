const express = require('express');
const authRouter = require("./auth");
const userRouter = require("./user");
const roleRouter = require("./role");


const routers = express.Router();

routers.use('/auth', authRouter)
routers.use('/user', userRouter)
routers.use('/role', roleRouter)
module.exports = routers;