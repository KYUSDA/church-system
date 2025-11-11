import { IUser } from "../../Models/authModel"; // optional if you have a User interface

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        role?: string;
        [key: string]: any;
      };
    }
  }
}
