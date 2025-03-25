import { Router } from "express";
import departmentDetail from "../Controlers/departmentControler";
const departDetail = Router();
departDetail
  .route("/:id")
  .delete(departmentDetail.deleteDepertment)

departDetail.route("/createDep").post(departmentDetail.createDep);
departDetail.patch("/update-department/:id", departmentDetail.updateDepartment);

departDetail
  .route("/get-all-departments")
  .get(departmentDetail.getAllDepartments)
  .post(departmentDetail.getDepartmentDetails);

export default departDetail;
