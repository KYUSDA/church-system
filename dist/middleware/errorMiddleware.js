"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const ErrorMiddleware = async (error, req, res, next) => {
    error.message = error.message || "Internal server error";
    error.statusCode = error.statusCode || 500;
    //mongodb objectid error
    if (error.message === "CastError") {
        const message = `Invalid resource: ${error.path} does not exists`;
        return next(new ErrorHandler_1.default(message, 401));
    }
    //duplicate resource
    if (error.statusCode === 11000) {
        const message = `Duplicate resource: ${Object.keys(error.keyValue)} is invalid`;
        return next(new ErrorHandler_1.default(message, 409));
    }
    //invalid token error
    if (error.name === "JsonWebTokenError") {
        const message = "Invalid token. Please login again";
        return next(new ErrorHandler_1.default(message, 401));
    }
    //token expired error
    if (error.name === "TokenExpiredError") {
        const message = "Token has expired. Please login again";
        return next(new ErrorHandler_1.default(message, 401));
    }
    res.status(error.statusCode).json({ success: false, message: error.message });
};
exports.ErrorMiddleware = ErrorMiddleware;
