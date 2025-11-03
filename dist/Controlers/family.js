"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFamily = exports.deleteFamily = exports.updateFamily = exports.getOne = exports.getAll = void 0;
const sanityClient_1 = require("../utils/sanityClient");
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
exports.getAll = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, resp) => {
    const query = req.query.new;
    const families = query
        ? await sanityClient_1.sanity.fetch('*[_type == "families"] | order(_createdAt desc)')
        : await sanityClient_1.sanity.fetch('*[_type == "families"]');
    resp.status(200).json(families);
});
exports.getOne = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, resp) => {
    const id = req.params.id;
    const getOneFamily = await sanityClient_1.sanity.fetch('*[_type == "families" && _id == $id][0]', { id });
    resp.status(200).json({
        status: "success",
        data: {
            getOneFamily,
        },
    });
});
exports.updateFamily = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, resp) => {
    const id = req.params.id;
    const updatedFamily = await sanityClient_1.sanity.patch(id).set(req.body).commit();
    resp.status(201).json({
        status: "success",
        user: {
            updatedFamily,
        },
    });
});
exports.deleteFamily = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, resp) => {
    const id = req.params.id;
    await sanityClient_1.sanity.delete(id);
    resp.status(204).json({
        status: "deleted",
        data: [],
    });
});
exports.createFamily = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, resp) => {
    const family = await sanityClient_1.sanity.create({
        _type: "families",
        ...req.body,
    });
    resp.status(200).json(family);
});
