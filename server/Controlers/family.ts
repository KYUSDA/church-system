import Family from "../Models/families";
import { Request,Response } from "express";
export async function getAll(req:Request, resp:Response) {
  try {
    const query = req.query.new;
    const users = query
      ? await Family.find().sort({ _id: -1 }).limit(5)
      : await Family.find();
    resp.status(200).json(users);
  } catch (err) {
    resp.status(404).json({
      status: "failure",
      error: err,
    });
  }
}

export async function getOne(req:Request, resp:Response) {
  try {
    const id = req.params.id;
    const getOneUser = await Family.findById(id);
    resp.status(200).json({
      status: "success",
      data: {
        getOneUser,
      },
    });
  } catch (err) {
    resp.status(404).json(err);
  }
}

export async function updateFamily(req:Request, resp:Response) {
  console.log(req.body);
  try {
    const id = req.params.id;
    const updatedUser = await Family.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(updatedUser);
    resp.status(201).json({
      status: "success",
      user: {
        updatedUser,
      },
    });
  } catch (err) {
    resp.status(404).json({
      status: "failure",
      error: err,
    });
  }
}

export async function deleteFamily(req:Request, resp:Response) {
  try {
    const id = req.params.id;
    console.log(id);
    const deletedUser = await Family.findByIdAndDelete(id);
    console.log(deletedUser);
    resp.status(204).json({
      status: "deleted",
      data: [],
    });
  } catch (err) {
    resp.status(404).json(err);
  }
}

export async function createFamily(req:Request, resp:Response) {
  try {
    console.log(req.body);
    const family = await Family.create(req.body);
    console.log(family);
    resp.status(200).json(family);
  } catch (err) {
    resp.status(404).json(err);
  }
}
