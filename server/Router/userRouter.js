const express = require('express');
const userController = require('../Controlers/userControler');
const userRouter = express.Router();
userRouter.route('/getUsers').get(userController.getAll);
userRouter.route('/createUser').post(userController.createUser);
userRouter.route('/:id')
.get(userController.getOne)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports = userRouter;
