"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Schema = mongoose_1.Schema;
const departmentDetails = new Schema({
    name: {
        type: String,
        required: [true, "please enter the department name"],
    },
    elder: {
        type: String,
        required: [true, "please enter elder in charge"],
    },
    event: {
        type: String,
    },
    head: {
        type: String,
        required: [true, "please enter head in charge of the department"],
    },
    project: {
        type: String,
    },
});
const departmentModel = (0, mongoose_1.model)("department", departmentDetails);
exports.default = departmentModel;
