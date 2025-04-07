import { Router } from "express";
import departmentDetail from "../Controlers/departmentControler";
import requireAuth,{ authorizeRoles } from "../middleware/authmiddleware";
const departDetail = Router();
departDetail
  .route("/:id")
  .delete(requireAuth,authorizeRoles("admin"),departmentDetail.deleteDepertment)

departDetail.post("/createDep",requireAuth, authorizeRoles("admin"), departmentDetail.createDep);
departDetail.patch("/update-department/:id",requireAuth, authorizeRoles("admin"), departmentDetail.updateDepartment);

departDetail
  .route("/get-all-departments")
  .get(requireAuth,authorizeRoles("admin"), departmentDetail.getAllDepartments)
  .post(requireAuth,authorizeRoles("admin"), departmentDetail.getDepartmentDetails);

export default departDetail;
