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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControler_1 = require("../Controlers/userControler");
const authmiddleware_1 = __importStar(require("../middleware/authmiddleware"));
const issueController_1 = require("../Controlers/issueController");
const multer_1 = __importDefault(require("multer"));
const authModel_1 = require("../Models/authModel");
const bibleController_1 = require("../Controlers/bibleController");
const upload = (0, multer_1.default)({ dest: "uploads/" });
const userRouter = (0, express_1.Router)();
userRouter.route("/get-user/:id").get(userControler_1.getOne);
userRouter.route("/getUsers").get(authmiddleware_1.default, (0, authmiddleware_1.authorizeRoles)(...authModel_1.ALL), userControler_1.getAll);
userRouter.patch("/update-user/:id", authmiddleware_1.default, (0, authmiddleware_1.authorizeRoles)(authModel_1.UserRole.SUPERADMIN), userControler_1.updateUser);
userRouter.route("/createUser").post(authmiddleware_1.default, (0, authmiddleware_1.authorizeRoles)(authModel_1.UserRole.SUPERADMIN), userControler_1.createUser);
userRouter.put("/update-avatar/:id", upload.single("avatar"), userControler_1.updateUserAvatar);
userRouter.put("/update-scores", authmiddleware_1.default, userControler_1.updateScore);
userRouter.put("/update-trivias", authmiddleware_1.default, userControler_1.updateTriviaNumbers);
userRouter.delete("/delete-user/:id", authmiddleware_1.default, (0, authmiddleware_1.authorizeRoles)(authModel_1.UserRole.SUPERADMIN), userControler_1.deleteUser);
userRouter.post("/celebrate-birthday", authmiddleware_1.default, (0, authmiddleware_1.authorizeRoles)(authModel_1.UserRole.SUPERADMIN, authModel_1.UserRole.ADMIN), userControler_1.sendBirthdayWishes);
userRouter.get("/birthdays", userControler_1.getUpcomingBirthdays);
// issues
userRouter.post("/report-issue", authmiddleware_1.default, issueController_1.createIssue);
userRouter.get("/get-issue/:id", issueController_1.getIssue);
userRouter.get("/get-issues", issueController_1.getIssues);
userRouter.patch("/update-issue/:id", issueController_1.updateIssue);
// scores
userRouter.get("/get-scores", userControler_1.getAllScores);
// bible
/* Reading progress */
userRouter.get("/progress", authmiddleware_1.default, bibleController_1.getReadingProgress);
userRouter.post("/toggle", authmiddleware_1.default, bibleController_1.toggleChapter);
/* Streak */
userRouter.get("/streak", authmiddleware_1.default, bibleController_1.getUserStreak);
userRouter.patch("/streak", authmiddleware_1.default, bibleController_1.upsertUserStreak);
exports.default = userRouter;
