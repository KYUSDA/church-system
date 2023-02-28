const express = require('express');
const userController = require('../Controlers/userControler');
const userRouter = express.Router();
userRouter.route('/getUsers').get(userController.getAll);
userRouter.route('/:id')
.get(userController.getOne)
.patch(userController.updateUser)
.delete(userController.deleteUser);
userRouter.post('/createUser',userController.createUser);

module.exports = userRouter;
