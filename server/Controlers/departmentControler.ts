import departmentModel from "../Models/departmentModel";
import { Response,Request } from "express";


const getDepartmentDetails = async (req:Request, resp:Response) => {
  try {
    const { departmentName } = req.body;
    const getData = await departmentModel.findOne({
      name: departmentName,
    });
    resp.status(200).json({
      status: "success",
      data: getData,
    });
  } catch (err) {
    resp.status(404).json({
      status: "failure",
      err: (err as Error).message,
    });
  }
};

const getAllDepartments = async (req:Request, resp: Response) => {
  try {
    const departments = await departmentModel.find();
    resp.status(200).json(departments);
  } catch (err) {
    resp.status(404).json(err);
  }
};

const deleteDepertment = async (req:Request, resp: Response) => {
  try {
    console.log("server deleting data");
    const id = req.params.id;
    console.log(id);
    const deletedDep = await departmentModel.findByIdAndDelete(id);
    console.log(deletedDep);
    resp.status(204).json({
      status: "deleted",
      data: [],
    });
  } catch (err) {
    resp.status(404).json(err);
  }
};
const updateDepartment = async (req:Request, resp:Response) => {
  try {
    const id = req.params.id;
    console.log(id, req.body, "from update claim");
    const updateDepartment = await departmentModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(id, updateDepartment);
    resp.status(201).json({
      status: "success",
      data: {
        updateDepartment,
      },
    });
  } catch (err) {
    resp.status(404).json({
      status: "failure",
      error: err,
    });
  }
};

const createDep = async (req:Request, resp:Response) => {
  try {
    const depart = await departmentModel.create(req.body);
    console.log(depart);
    resp.status(200).json(depart);
  } catch (err) {
    resp.status(404).json(err);
  }
};

export default {
  getDepartmentDetails,
  getAllDepartments,
  deleteDepertment,
  updateDepartment,
  createDep,
};
