"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = exports.notifySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.notifySchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });
// model
exports.NotificationModel = mongoose_1.default.model('Notification', exports.notifySchema);
