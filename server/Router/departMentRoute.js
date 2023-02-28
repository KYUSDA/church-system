const express = require('express');
const departmentDetail = require('../Controlers/departmentControler');
const departDetail = express.Router();
departDetail
.route("/getAll")
.get(departmentDetail.getAllDepartments)
.post(departmentDetail.getDepartmentDetails)

module.exports = departDetail