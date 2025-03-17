import { Response } from "express";
import { IUser } from "../Models/authModel";
import { redis } from "./redis";
import 'dotenv/config';

interface TokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

const accessTokenExpires = parseInt(process.env.ACCESS_TOKEN_EXPIRES || "60");

export const accessTokenOptions: TokenOptions = {
  expires: new Date(Date.now() + accessTokenExpires * 60 * 1000),
  maxAge: accessTokenExpires * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};


export const sendToken = async (user: IUser, res: Response) => {
  const access_token = user.signAccessToken();

  // required fields
  const userData = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    scores: user.scores,
    easyNumber: user.easyNumber,
    mediumNumber: user.mediumNumber,
    hardNumber: user.hardNumber,
    avatar: user.avatar?.url || null,
  };

  // Store user session in Redis with expiration time
  await redis.set(user._id as string, JSON.stringify(userData), "EX", accessTokenExpires * 60);

  // Set the access token cookie
  res.cookie("access_token", access_token, accessTokenOptions);

  // Return only necessary user details
  res.json({
    success: true,
    user: userData,
    accessToken: access_token,
    message: "Login successful",
  });
};
