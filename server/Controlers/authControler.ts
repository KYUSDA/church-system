import memberAuth from "../Models/authModel";
import bcrypt from "bcrypt";
import { Response, Request, NextFunction } from "express";
import { sendMail } from "../utils/mail";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import authModel from "../Models/authModel";
import { sendToken } from "../utils/jwt";
import validator from "validator";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../Models/authModel";
import "dotenv/config";

interface IRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  registration: string;
  course: string;
  year: string;
  phoneNumber: string;
  scores: number;
  password: string;
  familyLocated?: string;
  avatar?: string;
}

// const createJWT = (id: string, rememberMe: boolean): string => {
//   const tokenMaxAge = rememberMe ? extendedMaxAge : maxAge;
//   return sign({ id }, process.env.SECRET as string, {
//     expiresIn: tokenMaxAge,
//   });
// };

// register
export const memberSignUp = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        firstName,
        lastName,
        registration,
        year,
        course,
        email,
        password,
        phoneNumber,
      } = req.body as IRegisterUser;

      if (
        !firstName ||
        !lastName ||
        !registration ||
        !year ||
        !course ||
        !email ||
        !password ||
        !phoneNumber
      ) {
        return next(new ErrorHandler("Please provide all the inputs", 400));
      }

      //validate email
      const isValidEmail = validator.isEmail(email);
      if (!isValidEmail) {
        return next(new ErrorHandler("Incorrect email format", 400));
      }

      //validate password
      const isValidPassword = validator.isStrongPassword(password);
      if (!isValidPassword) {
        return next(
          new ErrorHandler(
            "Password should be at least 8 characters, have at least one uppercase letter, one numerical value and one special character",
            400
          )
        );
      }

      const isEmailExist = await authModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exists", 409));
      }

      // check if registration exists
      const isRegistrationExist = await authModel.findOne({ registration });
      if (isRegistrationExist) {
        return next(new ErrorHandler("Registration already exists", 409));
      }

      const user = {
        firstName,
        lastName,
        course,
        year,
        registration,
        phoneNumber,
        email,
        password,
      };

      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;

      const data = {
        firstName,
        email,
        password,
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtQVCYDri-bQmVrsKUsdNFYFBfL9dVZG8Cw&s",
        dashboardUrl: "http://localhost:3000/dashboard",
        activationCode,
      };

      try {
        await sendMail({
          template: "registered.ejs",
          subject: "Welcome to KyuSDA",
          data,
          email: user.email,
        });

        res.status(201).json({
          success: true,
          message: `Activation code sent to ${user.email}`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//create activation token
interface IActivationToken {
  activationCode: string;
  token: string;
}

const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(Math.random() * 9000 + 1000).toString(); // 4-digit code
  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET as string,
    {
      expiresIn: "5m",
    }
  );

  return { activationCode, token };
};

//Activate user
export const ActivateUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } = req.body;

      const verifyToken = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: IUser; activationCode: string };

      if (activation_code !== verifyToken.activationCode) {
        return next(new ErrorHandler("Activation code not valid", 400));
      }

      const newUser = verifyToken.user;
      const user = await authModel.create({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        registration: newUser.registration,
        course: newUser.course,
        year: newUser.year,
        phoneNumber: newUser.phoneNumber,
        password: newUser.password,
      });

      res
        .status(201)
        .json({ success: true, message: "User created successfully", user });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// login
export const memberSignIn = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, email } = req.body;

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
      const userInstance = new sendToken();
      const { accessToken, refreshToken } = await userInstance.createTokens(
        user
      );

      // save refresh token in the db
      if (!user.id) {
        return next(new ErrorHandler("User ID is missing", 500));
      }
      if (!refreshToken) {
        return next(new ErrorHandler("Refresh token is missing", 500));
      }
      await userInstance.saveRefreshToken(user.id, refreshToken);

      // send tokens
      const resp = {
        tokens: {
          accessToken,
          refreshToken,
        },
        user: {
          userId: user.id,
          role: user.role,
        },
      };

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: resp,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


// refresh token
export const refreshTokens = catchAsyncErrors(
  async (user_id: string, refreshToken: string) => {
    try {
      const user = await authModel.findById(user_id);
      if (!user) {
        throw new ErrorHandler("User not found", 404);
      }

      // Verify refresh token
      if (!user.storedRefreshToken) {
        throw new ErrorHandler("No refresh token stored for user", 401);
      }
      const isValid = await bcrypt.compare(
        refreshToken,
        user.storedRefreshToken
      );
      if (!isValid) {
        throw new ErrorHandler("Invalid refresh token", 401);
      }

      // Generate new tokens
      const userInstance = new sendToken();
      const { accessToken } = await userInstance.createTokens(
        user
      );

      return {
        success: true,
        tokens: {
          accessToken
        },
      };
    } catch (error: any) {
      throw new ErrorHandler(error.message, 400);
    }
  }
);

// logout
export const memberLogout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        return next(new ErrorHandler("User not authenticated", 401));
      }

      // Clear refresh token from database
      await authModel.findByIdAndUpdate(user.id, { storedRefreshToken: null });

      res.status(200).json({
        success: true,
        message: "User logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// validate session
export const validateSession = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      return next(
        new ErrorHandler("Session not found. Please log in again.", 401)
      );
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN as string
      ) as JwtPayload;
    } catch (err: any) {
      console.log("JWT verification failed:", err.message);
      return next(new ErrorHandler("Invalid or expired session.", 401));
    }

    if (!decoded || !decoded.id) {
      return next(new ErrorHandler("Invalid token payload", 401));
    }

    const userFound = await authModel.findById(decoded.id);
    if (!userFound) {
      console.log(`User ${decoded.id} not found in Redis`);
      return next(
        new ErrorHandler("Session expired. Please log in again.", 401)
      );
    }

    // Optional: verify redis user matches JWT if needed

    const user = userFound;

    return res.status(200).json({
      success: true,
      user,
    });
  }
);

// reset token
export const memberResetToken = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email) return next(new ErrorHandler("Email is required", 400));

    const getMember = await memberAuth.findOne({ email });
    if (!getMember) return next(new ErrorHandler("Member not found", 404));

    const tokenGen = await getMember.resetToken();
    await getMember.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/resetPassword/${tokenGen}`;
    const message = `Forgotten password? Don't worry, click here to reset it:`;

    const data = {
      url: resetUrl,
      name: getMember.firstName,
      message,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtQVCYDri-bQmVrsKUsdNFYFBfL9dVZG8Cw&s",
    };

    await sendMail({
      email: getMember.email,
      subject: "Reset Password Token",
      template: "resetPassword.ejs",
      data,
    }).catch((err) => next(new ErrorHandler("Email could not be sent", 500)));

    res.status(200).json({
      status: "success",
      resetToken: tokenGen,
      message,
    });
  }
);

export const resetPassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const tk = req.params.token;
    if (!tk) return next(new ErrorHandler("Token is required", 400));

    const getMember = await memberAuth.findOne({
      resetTokenExpires: { $gt: Date.now() }, // Ensure token has not expired
    });

    if (!getMember || !getMember.passwordResetToken)
      return next(new ErrorHandler("Token is invalid or has expired", 400));

    // 🔹 Use bcrypt.compare to check token validity
    const isMatch = await bcrypt.compare(tk, getMember.passwordResetToken);
    console.log("Received Token:", tk);
    console.log("Stored Hashed Token in DB:", getMember.passwordResetToken);
    console.log("Does Token Match?:", isMatch);

    if (!isMatch)
      return next(new ErrorHandler("Token is invalid or has expired", 400));

    getMember.password = req.body.password;
    getMember.passwordResetToken = undefined;
    getMember.resetTokenExpires = undefined;

    await getMember.save();

    res.status(200).json({
      status: "success",
      message: "Password updated successfully",
      redirect: "signIn",
    });
  }
);

// change password
export const changePassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body;
      if (!oldPassword || !newPassword)
        return next(new ErrorHandler("Please provide all fields", 400));

      const user = await memberAuth.findById(req.user?.id).select("+password");
      if (!user) return next(new ErrorHandler("User not found", 404));

      const isMatch = await user.comparePasswords(oldPassword);
      if (!isMatch) return next(new ErrorHandler("Password is incorrect", 400));

      user.password = newPassword;
      await user.save();

      const data = {
        name: user.firstName,
        date: Date.now(),
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtQVCYDri-bQmVrsKUsdNFYFBfL9dVZG8Cw&s",
        dashboardUrl: `${process.env.CLIENT_URL}/member/settings`,
      };

      // send email to user
      await sendMail({
        email: user.email,
        subject: "Password Changed Successfully",
        template: "passwordChanged.ejs",
        data,
      });

      res.status(200).json({
        status: "success",
        message: "Password updated successfully",
      });
    } catch (error) {
      return next(new ErrorHandler("Error fetching quizzes", 500));
    }
  }
);

export const updateUserBirthday = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { birthday } = req.body;

      console.log(birthday);

      if (!birthday) return next(new ErrorHandler("Birthday is required", 400));

      // Validate birthday
      const today = new Date();
      const birthDate = new Date(birthday);
      if (birthDate > today) {
        return next(
          new ErrorHandler("Please enter a valid date of birth", 400)
        );
      }

      const user = await memberAuth.findByIdAndUpdate(
        req.user?.id,
        { birthday },
        { new: true }
      );

      if (!user) return next(new ErrorHandler("User not found", 404));

      res.status(200).json({
        status: "success",
        message: "Birthday updated successfully",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler("Error fetching quizzes", 500));
    }
  }
);

export default {
  memberSignUp,
  memberSignIn,
  refreshTokens,
  ActivateUser,
  memberLogout,
  changePassword,
  updateUserBirthday,
  memberResetToken,
  resetPassword,
  validateSession,
};
