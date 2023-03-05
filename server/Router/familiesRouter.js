const express = require('express');
const familyController = require('../Controlers/family');
const familyRouter = express.Router();
familyRouter.route('/getFamilies')
.get(familyController.getAll);
familyRouter
.route('/createFamily')
.post(familyController.createFamily);

familyRouter.route('/:id')
.get(familyController.getOne)
.patch(familyController.updateFamily)
.delete(familyController.deleteFamily);

module.exports = familyRouter;
