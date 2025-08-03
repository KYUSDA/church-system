import { Router } from "express";
import multer from "multer";
import { getResourcesByType, uploadResource } from "../Controlers/resourcesController";

const upload = multer({ dest: "uploads/" }); // disk storage

export const resourceRouter = Router();
// single main file + optional thumbnail
resourceRouter.post(
  "/upload",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  uploadResource
);


// get resource
resourceRouter.get("/",getResourcesByType);