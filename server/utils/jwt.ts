import { Response } from "express";
import { IUser } from "../Models/authModel";
import { redis } from "./redis";
import "dotenv/config";

export interface TokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  path?: string;
}

const ACCESS_TOKEN_MINUTES = parseInt(process.env.ACCESS_TOKEN_EXPIRES || "10");

export const sendToken = async (user: IUser, res: Response) => {
  const access_token = user.signAccessToken(); // ≤ 60 min exp claim

  const cookieOptions = {
    httpOnly: true,
    path: "/", // every route receives it
    maxAge: ACCESS_TOKEN_MINUTES * 60 * 1000, // ms
    expires: new Date(Date.now() + ACCESS_TOKEN_MINUTES * 60 * 1000),
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  } as const;

  res.cookie("access_token", access_token, cookieOptions);

  // add user in redis
  const redisExpiration = ACCESS_TOKEN_MINUTES * 60; // seconds
  await redis.setex(
    String(user._id),
    redisExpiration,
    JSON.stringify({ id: user._id, role: user.role })
  );

  res.status(200).json({
    success: true,
    user: { id: user._id, role: user.role },
    message: "Login successful",
  });
};