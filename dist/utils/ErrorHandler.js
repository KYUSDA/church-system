"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler extends Error {
    keyValue(keyValue) {
        throw new Error("Method not implemented.");
    }
    statusCode;
    path;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorHandler;
