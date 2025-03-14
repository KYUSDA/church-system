import { Schema as _Schema, Document, model, Model } from "mongoose";
const Schema = _Schema;
import pkg from "validator";
import bcrypt, { genSalt, hash } from "bcrypt";
import { randomBytes, createHash } from "crypto";
const { isEmail } = pkg;
import jwt  from "jsonwebtoken";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  registration: string;
  course: string;
  year: number;
  phoneNumber: string;
  avatar?:{
    public_id: String;
    url: String;
  };
  password: string;
  passwordConfirm?: string;
  role: "member" | "elder" | "admin";
  familyLocated?: string;
  passwordresetToken?: string;
  resetTokenSetAt?: Date;
  resetTokenexpires?: Date;
  resetToken(): Promise<string>;
  comparePasswords: (password: string) => Promise<boolean>;
  signAccessToken: () => string,
};

export interface IUserModel extends Model<IUser> {
  login(email: string, password: string): Promise<IUser>;
}

const authSchema = new Schema<IUser>({
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
  password: {
    type: String,
    required: [true, "please enter your password"],
    minlength: [8, "please enter 8 or more characters"],
  },
  passwordConfirm: {
    type: String,
    required: function (this: IUser) {
      return this.isNew; // Only required when creating a new user
    },
    validate: {
      validator: function (this: IUser, el: string): boolean {
        return el === this.password;
      },
      message: `Enter the correct password confirmation`,
    },
  },
  
  familyLocated: {
    type: String,
    default: "not yet assigned",
  },
  role: {
    type: String,
    enum: ["member", "elder", "admin"],
    default: "member",
  },
  passwordresetToken: String,
  resetTokenSetAt: Date,
  resetTokenexpires: Date,
});

//hash password
authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  this.passwordConfirm = undefined;
  next();
});


//compare passwords
authSchema.methods.comparePasswords = async function(password: string) {
    return await bcrypt.compare(password, this.password);
}


//send the reset Token
authSchema.methods.resetToken = async function (): Promise<string> {
  const token = randomBytes(32).toString("hex");
  this.passwordresetToken = createHash("sha256").update(token).digest("hex");
  this.resetTokenexpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration
  return token;
};

//sign access token
authSchema.methods.signAccessToken = function(): string {
  return jwt.sign({id: this.id}, process.env.ACCESS_TOKEN as string, {expiresIn: "60m"})
}


const authModel = model<IUser, IUserModel>("member", authSchema);
export default authModel;
