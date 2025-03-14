import memberAuth from "../Models/authModel";
import { createHash } from "crypto";
import pkg from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { sendMail } from "../utils/mail";
import { redis } from "../utils/redis";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import authModel from "../Models/authModel";
import { sendToken } from "../utils/jwt";


const { sign } = pkg;

let maxAge = 60 * 60;
let extendedMaxAge = 3 * 24 * 60 * 60;


const createJWT = (id: string, rememberMe: boolean): string => {
  const tokenMaxAge = rememberMe ? extendedMaxAge : maxAge;
  return sign({ id }, process.env.SECRET as string, {
    expiresIn: tokenMaxAge,
  });
};

const memberSignUp = async (req:Request, resp: Response) => {
  try {
    const memberRegistered = await memberAuth.create(req.body);
    const id = memberRegistered._id;
    //generate token and pass the cookie inside.
    const tk = createJWT(id.toString(), false);
    resp.cookie("kyuSdaMember", tk, { httpOnly: true, maxAge: maxAge * 1000 });

    const data ={
      email: memberRegistered.email,
      name: memberRegistered.firstName,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtQVCYDri-bQmVrsKUsdNFYFBfL9dVZG8Cw&s",
      dashboardUrl: "http://localhost:3000/dashboard"
    }
    // send email
    sendMail({
      subject: "Welcome to KyuSDA",
      template: "registered.ejs",
      email: memberRegistered.email,
      data
    });

    resp.status(200).json({
      id: id,
      status: "Registratio Succesfull",
      email: memberRegistered.email,
      tk,
    });
  } catch (error: any) {
    const errorResponse = {
      status: "failure",
      error: error.message,
    };

    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      const duplicateValue = error.keyValue[duplicateField];
      errorResponse.error = `Duplicate ${duplicateField}: ${duplicateValue} already exists`;
    }

    resp.status(404).json(errorResponse);
  }
};

// const memberSignIn = async (req:Request, resp: Response) => {
//   try {
//     const { email, password, rememberMe } = req.body;
//     const loggedMember = await memberAuth.login(email, password);
//     const id = loggedMember._id;

//     const tk = createJWT(id.toString(), rememberMe);
//     resp.cookie("kyuSdaMember", tk, { httpOnly: true, maxAge: maxAge * 1000 });

//     // add user to redis session
//     await redis.set(id.toString(), JSON.stringify(loggedMember));

//     resp.status(200).json({
//       id,
//       status: "success",
//       email: loggedMember.email,
//       tk,
//     });
//   } catch (err) {
//     resp.status(404).json({
//       status: "failure",
//       err: (err as Error).message,
//     });
//   }
// };

export const memberSignIn = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, email } = req.body;
      console.log(password,email)
      if (!password || !email) {
        return next(new ErrorHandler("Please provide all the fields", 400));
      }

      const user = await authModel.findOne({ email });
      if (!user) {
        return next(new ErrorHandler("email or password is invalid", 400));
      }

      const passwordCorrect = await user.comparePasswords(password);
      if (!passwordCorrect) {
        return next(new ErrorHandler("email or password is invalid", 400));
      }

      //create cookies
      try {
        await sendToken(user, res);
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);



// logout
const memberLogout = catchAsyncErrors( async (req: Request, res: Response,next:NextFunction) => {
  try {

     // clear cookies
     res.cookie("access_token", "", { maxAge: 1 });
   
     const redisUser = req.user?.id;
     console.log("User ID from request:", redisUser);
      if (redisUser) {
        console.log("User session deleted from redis");
        await redis.del(redisUser);
      } else {
        console.log(`user: ${redisUser} not found in redis`);
      }

      res.status(200).json({ success: true, message: "User logged out" });
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400)); 
  }
});

const memberResetToken = async (req:Request, resp: Response) => {
  try {
    const { email } = req.body;
    //generate a token from methods
    let getMember = await memberAuth.findOne({ email });
    if (!getMember) {
      throw new Error("Member not found");
    }
    const tokenGen = await getMember.resetToken();
    //save to database
    await getMember.save({ validateBeforeSave: false });
    const resetUrl = `${req.protocol}://localhost:3000/resetPassword`;
    const message = `Forgotten password? Don't worry click here to reset it:`;

    const data={
      url: resetUrl,
      name: getMember.firstName,
      message,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtQVCYDri-bQmVrsKUsdNFYFBfL9dVZG8Cw&s"
    }
    await sendMail({
      email: getMember.email,
      subject: "Reset Password Token",
      template: "resetPassword.ejs",
      data
    });
    resp.status(200).json({
      status: "success",
      resetToken: tokenGen,
      message,
    });
  } catch (err) {
    resp.status(404).json({
      status: "failure",
      err,
    });
  }
};

const resetPassword = async (req:Request, resp: Response) => {
  const tk = req.params.token;
  try {
    const hashToken = createHash("sha256").update(tk).digest("hex");
    const getMember = await memberAuth.findOne({
      passwordResetToken: hashToken,
      resetTokenExpires: { $gt: Date.now() },
    });
    if (getMember) {
      getMember.password = req.body.password;
      getMember.passwordConfirm = req.body.passwordConfirm;
      getMember.resetTokenSetAt = new Date();
      getMember.passwordresetToken = undefined;
      getMember.resetTokenexpires = undefined;
      await getMember.save();
      resp.status(200).json({
        status: "success",
        message: "password updated successfully",
        redirect: "signIn",
      });
    }
  } catch (err) {
    resp.status(404).json({
      status: "fail",
      err,
    });
  }
};

export default {
  memberSignUp,
  memberSignIn,
  memberLogout,
  memberResetToken,
  resetPassword,
};
