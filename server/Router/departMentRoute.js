import { Router } from "express";
import departmentDetail from "../Controlers/departmentControler.js";
const departDetail = Router();
departDetail
  .route("/:id")
  .delete(departmentDetail.deleteDepertment)
  .patch(departmentDetail.updateDepartment);

departDetail.route("/createDep").post(departmentDetail.createDep);

departDetail
  .route("/getAll")
  .get(departmentDetail.getAllDepartments)
  .post(departmentDetail.getDepartmentDetails);

export default departDetail;
