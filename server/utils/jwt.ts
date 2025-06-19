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

const ACCESS_TOKEN_MINUTES = parseInt(process.env.ACCESS_TOKEN_EXPIRES || "60");

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
  await redis.set(
    String(user._id),
    JSON.stringify({ id: user._id, role: user.role })
  );

  res.status(200).json({
    success: true,
    user: { id: user._id, role: user.role },
    message: "Login successful",
  });
};

/* ───────────── Read env ­──────────── */
// export const ACCESS_TOKEN_MINUTES = parseInt(process.env.ACCESS_TOKEN_EXPIRES || "60"); // minutes
// export const REFRESH_TOKEN_DAYS = parseInt(process.env.REFRESH_TOKEN_EXPIRES || "7"); // days

// export const sendToken = async (user: IUser, res: Response) => {
//   const access_token = user.signAccessToken(); // 60 min
//   const refresh_token = user.signRefreshToken(); // 7 days

//   const accessCookieOptions: TokenOptions = {
//     httpOnly: true,
//     expires: new Date(Date.now() + ACCESS_TOKEN_MINUTES * 60 * 1000),
//     maxAge: ACCESS_TOKEN_MINUTES * 60 * 1000,
//     path: "/",
//     secure: process.env.NODE_ENV === "production",
//     sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//   };

//   const refreshCookieOptions: TokenOptions = {
//     httpOnly: true,
//     expires: new Date(Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000),
//     maxAge: REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000,
//     path: "/",
//     sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//     secure: process.env.NODE_ENV === "production",
//     // domain : ".example.com",
//   };

//   /* persist session in Redis for the refresh‑token lifetime */
//   await redis.set(
//     String(user._id),
//     JSON.stringify({ id: user._id, role: user.role }),
//     "EX",
//     REFRESH_TOKEN_DAYS * 24 * 60 * 60
//   );

//   /* set cookies */
//   res.cookie("access_token", access_token, accessCookieOptions);
//   res.cookie("refresh_token", refresh_token, refreshCookieOptions);

//   res.json({
//     success: true,
//     user: { id: user._id, role: user.role },
//     message: "Login successful",
//   });
// };
