const express = require('express');
const RoleController = require('../controller/role');
const checkAuth = require('../middleware/auth-check')
const roleRouter = express.Router()

roleRouter.get("/get", RoleController.roleList);
roleRouter.post("/create", RoleController.create);
roleRouter.post("/update", RoleController.update);
roleRouter.get("/delete-role", RoleController.deleteRole);
module.exports = roleRouter;