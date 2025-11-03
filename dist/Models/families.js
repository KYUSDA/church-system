"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Schema = mongoose_1.Schema;
const familySchema = new Schema({
    name: {
        type: String,
        required: [true, "please enter the department name"],
    },
    elder: {
        type: String,
        required: [true, "please enter elder in charge"],
    },
    head: {
        type: String,
        required: [true, "please enter head in charge of the department"],
    },
    location: {
        type: String,
    },
    bio: {
        type: String,
    },
});
const familyModel = (0, mongoose_1.model)("family", familySchema);
exports.default = familyModel;
