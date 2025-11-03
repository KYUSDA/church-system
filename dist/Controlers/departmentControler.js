"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const departmentModel_1 = __importDefault(require("../Models/departmentModel"));
const sanityClient_1 = require("../utils/sanityClient");
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const getDepartmentDetails = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, resp, next) => {
    const { departmentName } = req.body;
    // Query Sanity for the department details
    const query = `*[_type == "department" && name == $departmentName][0]`;
    const getData = await sanityClient_1.sanity.fetch(query, { departmentName });
    if (!getData) {
        return next(new ErrorHandler_1.default("Department not found", 404));
    }
    resp.status(200).json({
        status: "success",
        data: getData,
    });
});
const getAllDepartments = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, resp, next) => {
    const query = '*[_type == "departments"]';
    const departments = await sanityClient_1.sanity.fetch(query);
    if (!departments) {
        return next(new ErrorHandler_1.default("No departments found", 404));
    }
    resp.status(200).json(departments);
});
const deleteDepertment = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, resp, next) => {
    const id = req.params.id;
    const deleted = await sanityClient_1.sanity.delete(id);
    if (!deleted) {
        return next(new ErrorHandler_1.default("Department not found", 404));
    }
    resp.status(204).json({
        status: "deleted",
        data: [],
    });
});
const updateDepartment = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, resp, next) => {
    const id = req.params.id;
    const updatedDepartment = await sanityClient_1.sanity.patch(id).set(req.body).commit();
    if (!updatedDepartment) {
        return next(new ErrorHandler_1.default("Department not found", 404));
    }
    resp.status(201).json({
        status: "success",
        data: {
            updatedDepartment,
        },
    });
});
const createDep = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, resp, next) => {
    const depart = await departmentModel_1.default.create(req.body);
    if (!depart) {
        return next(new ErrorHandler_1.default("Failed to create department", 400));
    }
    resp.status(200).json(depart);
});
exports.default = {
    getDepartmentDetails,
    getAllDepartments,
    deleteDepertment,
    updateDepartment,
    createDep,
};
