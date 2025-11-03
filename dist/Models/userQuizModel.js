"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQuizProgressModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userQuizProgressSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    quiz: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Quiz", required: true },
    completed: { type: Boolean, default: false },
});
exports.userQuizProgressModel = mongoose_1.default.model("UserQuizProgress", userQuizProgressSchema);
