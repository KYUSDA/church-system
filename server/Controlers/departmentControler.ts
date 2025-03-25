import departmentModel from "../Models/departmentModel";
import { Response, Request, NextFunction } from "express";
import { sanity } from "../utils/sanityClient";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";

const getDepartmentDetails = catchAsyncErrors(async (req: Request, resp: Response, next: NextFunction) => {
  const { departmentName } = req.body;

  // Query Sanity for the department details
  const query = `*[_type == "department" && name == $departmentName][0]`;
  const getData = await sanity.fetch(query, { departmentName });

  if (!getData) {
    return next(new ErrorHandler("Department not found", 404));
  }

  resp.status(200).json({
    status: "success",
    data: getData,
  });
});

const getAllDepartments = catchAsyncErrors(async (req: Request, resp: Response, next: NextFunction) => {
  const query = '*[_type == "departments"]';
  const departments = await sanity.fetch(query);

  if (!departments) {
    return next(new ErrorHandler("No departments found", 404));
  }

  resp.status(200).json(departments);
});

const deleteDepertment = catchAsyncErrors(async (req: Request, resp: Response, next: NextFunction) => {
  const id = req.params.id;
  const deleted = await sanity.delete(id);

  if (!deleted) {
    return next(new ErrorHandler("Department not found", 404));
  }

  resp.status(204).json({
    status: "deleted",
    data: [],
  });
});

const updateDepartment = catchAsyncErrors(async (req: Request, resp: Response, next: NextFunction) => {
  const id = req.params.id;
  const updatedDepartment = await sanity.patch(id).set(req.body).commit();

  if (!updatedDepartment) {
    return next(new ErrorHandler("Department not found", 404));
  }

  resp.status(201).json({
    status: "success",
    data: {
      updatedDepartment,
    },
  });
});

const createDep = catchAsyncErrors(async (req: Request, resp: Response, next: NextFunction) => {
  const depart = await departmentModel.create(req.body);

  if (!depart) {
    return next(new ErrorHandler("Failed to create department", 400));
  }

  resp.status(200).json(depart);
});

export default {
  getDepartmentDetails,
  getAllDepartments,
  deleteDepertment,
  updateDepartment,
  createDep,
};
