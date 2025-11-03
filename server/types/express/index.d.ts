import { IUser } from "../../Models/authModel";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};


