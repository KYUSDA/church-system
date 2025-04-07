import { sanity } from "../utils/sanityClient";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { Request, Response } from "express";

export const getAll = catchAsyncErrors(async (req: Request, resp: Response) => {
  const query = req.query.new;
  const families = query
    ? await sanity.fetch('*[_type == "families"] | order(_createdAt desc)')
    : await sanity.fetch('*[_type == "families"]');
  resp.status(200).json(families);
});

export const getOne = catchAsyncErrors(async (req: Request, resp: Response) => {
  const id = req.params.id;
  const getOneFamily = await sanity.fetch('*[_type == "families" && _id == $id][0]', { id });
  resp.status(200).json({
    status: "success",
    data: {
      getOneFamily,
    },
  });
});

export const updateFamily = catchAsyncErrors(async (req: Request, resp: Response) => {
  const id = req.params.id;
  const updatedFamily = await sanity.patch(id).set(req.body).commit();
  resp.status(201).json({
    status: "success",
    user: {
      updatedFamily,
    },
  });
});

export const deleteFamily = catchAsyncErrors(async (req: Request, resp: Response) => {
  const id = req.params.id;
  await sanity.delete(id);
  resp.status(204).json({
    status: "deleted",
    data: [],
  });
});

export const createFamily = catchAsyncErrors(async (req: Request, resp: Response) => {
  const family = await sanity.create({
    _type: "families",
    ...req.body,
  });
  resp.status(200).json(family);
});
