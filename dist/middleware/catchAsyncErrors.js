"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsyncErrors = void 0;
const catchAsyncErrors = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.catchAsyncErrors = catchAsyncErrors;
