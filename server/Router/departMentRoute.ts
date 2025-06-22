import { Router } from "express";
import departmentDetail from "../Controlers/departmentControler";
import requireAuth,{ authorizeRoles } from "../middleware/authmiddleware";
import { ALL, UserRole } from "../Models/authModel";
const departDetail = Router();
departDetail
  .route("/:id")
  .delete(
    requireAuth,
    authorizeRoles(UserRole.SUPERADMIN),
    departmentDetail.deleteDepertment
  );

departDetail.post("/createDep",requireAuth, authorizeRoles(UserRole.SUPERADMIN), departmentDetail.createDep);
departDetail.patch("/update-department/:id",requireAuth, authorizeRoles(UserRole.SUPERADMIN), departmentDetail.updateDepartment);

departDetail
  .route("/get-all-departments")
  .get(requireAuth, authorizeRoles(...ALL), departmentDetail.getAllDepartments)
  .post(
    requireAuth,
    authorizeRoles(UserRole.SUPERADMIN),
    departmentDetail.getDepartmentDetails
  );

export default departDetail;
