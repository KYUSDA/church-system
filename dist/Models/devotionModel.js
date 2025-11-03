"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devotionModel = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const devotionSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "please enter your email"],
        validate: [validator_1.default.isEmail, "please enter a valid email"],
        lowerCase: true,
        unique: true,
    },
    subscribed: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
// model
exports.devotionModel = (0, mongoose_1.model)('devotion', devotionSchema);
