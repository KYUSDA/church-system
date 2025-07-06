import { Schema as _Schema, Document, model, Model } from "mongoose";
const Schema = _Schema;
import pkg from "validator";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
const { isEmail } = pkg;
import jwt  from "jsonwebtoken";

export enum UserRole {
  MEMBER = "member",
  ELDER = "elder",
  ADMIN = "admin",
  SUPERADMIN = "superadmin"
}

export type Roles = `${UserRole}`;

export const ALL: Roles[] = [
  UserRole.ELDER,
  UserRole.ADMIN,
  UserRole.SUPERADMIN,
];

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  registration: string;
  course: string;
  year: number;
  phoneNumber: string;
  birthday?: Date;
  scores?: number;
  easyNumber?: number;
  mediumNumber?: number;
  hardNumber?: number;
  avatar?: {
    public_id: String;
    url: String;
  };
  password: string;
  role: UserRole;
  familyLocated?: string;
  createdAt: Date;
  passwordResetToken?: string;
  resetTokenSetAt?: Date;
  resetTokenExpires?: Date;
  resetToken(): Promise<string>;
  comparePasswords: (password: string) => Promise<boolean>;
  signAccessToken: () => string;
};

export interface IUserModel extends Model<IUser> {
  login(email: string, password: string): Promise<IUser>;
}

const authSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "please enter your firstName"],
    },
    lastName: {
      type: String,
      required: [true, "please enter your lastName"],
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      validate: [isEmail, "please enter a valid email"],
      lowerCase: true,
      unique: true,
    },
    registration: {
      type: String,
      required: [true, "please enter your registration number"],
      minlength: [10, "please enter a minlength of 10"],
      unique: true,
    },
    course: {
      type: String,
      required: [true, "please enter your course"],
    },
    avatar: {
      public_id: String,
      url: String,
    },
    year: {
      type: Number,
      required: [true, "please enter year of study"],
    },
    phoneNumber: {
      type: String,
      required: [true, "please enter your phone number"],
    },
    birthday: {
      type: Date,
      default: null,
    },
    scores: {
      type: Number,
      default: 0,
    },
    easyNumber: {
      type: Number,
      default: 0,
    },
    mediumNumber: {
      type: Number,
      default: 0,
    },
    hardNumber: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: [true, "please enter your password"],
      minlength: [8, "please enter 8 or more characters"],
    },

    familyLocated: {
      type: String,
      default: "not yet assigned",
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.MEMBER, // Default role is MEMBER
    },
    createdAt: { type: Date, default: Date.now },
    passwordResetToken: String,
    resetTokenSetAt: Date,
    resetTokenExpires: Date,
  },
  { timestamps: true }
);



//bcrypt hash password
authSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//compare passwords
authSchema.methods.comparePasswords = async function(password: string) {
    return await bcrypt.compare(password, this.password);
}


// reset token
authSchema.methods.resetToken = async function (): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const saltRounds = 10;

  this.passwordResetToken = await bcrypt.hash(token, saltRounds);  // Hash the token
  this.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1-hour expiration

  console.log("Generated Token (Plain):", token);
  console.log("Stored Hashed Token:", this.passwordResetToken);

  return token;  // Send the plain token in the email
};


//sign access token
authSchema.methods.signAccessToken = function(): string {
  return jwt.sign({id: this.id}, process.env.ACCESS_TOKEN as string, {expiresIn: "10m"})
}

const authModel = model<IUser, IUserModel>("member", authSchema);
export default authModel;
