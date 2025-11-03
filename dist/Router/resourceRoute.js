"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const resourcesController_1 = require("../Controlers/resourcesController");
const upload = (0, multer_1.default)({ dest: "uploads/" }); // disk storage
exports.resourceRouter = (0, express_1.Router)();
// single main file + optional thumbnail
exports.resourceRouter.post("/upload", upload.fields([
    { name: "file", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
]), resourcesController_1.uploadResource);
// get resource
exports.resourceRouter.get("/", resourcesController_1.getResourcesByType);
