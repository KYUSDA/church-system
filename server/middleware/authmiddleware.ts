import authModel from "../Models/authModel.js";
import { verify, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    if (!process.env.SECRET) {
      throw new Error("SECRET environment variable is not defined");
    }
    const { _id } = verify(token, process.env.SECRET) as JwtPayload;

    const user = await authModel.findOne({ _id }).select("_id");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;