"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const notificationController_1 = require("../Controlers/notificationController");
const express_1 = require("express");
const authmiddleware_1 = __importStar(require("../middleware/authmiddleware"));
const authModel_1 = require("../Models/authModel");
const notificationRouter = (0, express_1.Router)();
notificationRouter.post("/create-notification", authmiddleware_1.default, (0, authmiddleware_1.authorizeRoles)(authModel_1.UserRole.SUPERADMIN), notificationController_1.createNotification);
notificationRouter.get("/getAll-notification", authmiddleware_1.default, notificationController_1.getAllNotifications);
notificationRouter.patch("/update-state", authmiddleware_1.default, notificationController_1.updateNotificationState);
exports.default = notificationRouter;
