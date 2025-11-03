"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ErrorHandler_js_1 = __importDefault(require("../utils/ErrorHandler.js"));
const catchAsyncErrors_js_1 = require("./catchAsyncErrors.js");
const authModel_js_1 = __importDefault(require("../Models/authModel.js"));
exports.requireAuth = (0, catchAsyncErrors_js_1.catchAsyncErrors)(async (req, _res, next) => {
    const authHeader = req.headers.authorization;
    const access_token = authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : null;
    console.log("Access token present:", !!access_token);
    if (!access_token) {
        throw new ErrorHandler_js_1.default("Session not found. Please log in again…", 401);
    }
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(access_token, process.env.ACCESS_TOKEN);
    }
    catch (err) {
        console.log("JWT verification error:", err.name, err.message);
        if (err.name === "TokenExpiredError") {
            throw new ErrorHandler_js_1.default("Session expired. Please log in again.", 401);
        }
        throw new ErrorHandler_js_1.default("Invalid session. Please log in again.", 401);
    }
    if (!decoded || !decoded.id) {
        throw new ErrorHandler_js_1.default("Invalid token payload", 401);
    }
    // Fetch the full user object from the database using the decoded id
    const user = await authModel_js_1.default.findById(decoded.id);
    if (!user) {
        throw new ErrorHandler_js_1.default("User not found", 404);
    }
    req.user = user;
    next();
});
// middleware/authorizeRoles.ts
const authorizeRoles = (...allowedRoles) => {
    return (req, _res, next) => {
        const user = req.user; // populated by your auth middleware
        if (!user) {
            return next(new ErrorHandler_js_1.default("User not authenticated", 401));
        }
        if (!allowedRoles.includes(user.role)) {
            return next(new ErrorHandler_js_1.default("Access Denied", 403));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
exports.default = exports.requireAuth;
