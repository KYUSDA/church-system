"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserBirthday = exports.changePassword = exports.resetPassword = exports.memberResetToken = exports.validateSession = exports.memberLogout = exports.refreshTokens = exports.memberSignIn = exports.ActivateUser = exports.memberSignUp = void 0;
const authModel_1 = __importDefault(require("../Models/authModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mail_1 = require("../utils/mail");
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const authModel_2 = __importDefault(require("../Models/authModel"));
const jwt_1 = require("../utils/jwt");
const validator_1 = __importDefault(require("validator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
// const createJWT = (id: string, rememberMe: boolean): string => {
//   const tokenMaxAge = rememberMe ? extendedMaxAge : maxAge;
//   return sign({ id }, process.env.SECRET as string, {
//     expiresIn: tokenMaxAge,
//   });
// };
// register
exports.memberSignUp = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { firstName, lastName, registration, year, course, email, password, phoneNumber, } = req.body;
        if (!firstName ||
            !lastName ||
            !registration ||
            !year ||
            !course ||
            !email ||
            !password ||
            !phoneNumber) {
            return next(new ErrorHandler_1.default("Please provide all the inputs", 400));
        }
        //validate email
        const isValidEmail = validator_1.default.isEmail(email);
        if (!isValidEmail) {
            return next(new ErrorHandler_1.default("Incorrect email format", 400));
        }
        //validate password
        const isValidPassword = validator_1.default.isStrongPassword(password);
        if (!isValidPassword) {
            return next(new ErrorHandler_1.default("Password should be at least 8 characters, have at least one uppercase letter, one numerical value and one special character", 400));
        }
        const isEmailExist = await authModel_2.default.findOne({ email });
        if (isEmailExist) {
            return next(new ErrorHandler_1.default("Email already exists", 409));
        }
        // check if registration exists
        const isRegistrationExist = await authModel_2.default.findOne({ registration });
        if (isRegistrationExist) {
            return next(new ErrorHandler_1.default("Registration already exists", 409));
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
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtQVCYDri-bQmVrsKUsdNFYFBfL9dVZG8Cw&s",
            dashboardUrl: "http://localhost:3000/dashboard",
            activationCode,
        };
        try {
            await (0, mail_1.sendMail)({
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
        }
        catch (error) {
            return next(new ErrorHandler_1.default(error.message, 400));
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
const createActivationToken = (user) => {
    const activationCode = Math.floor(Math.random() * 9000 + 1000).toString(); // 4-digit code
    const token = jsonwebtoken_1.default.sign({ user, activationCode }, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
    return { activationCode, token };
};
//Activate user
exports.ActivateUser = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { activation_token, activation_code } = req.body;
        const verifyToken = jsonwebtoken_1.default.verify(activation_token, process.env.ACTIVATION_SECRET);
        if (activation_code !== verifyToken.activationCode) {
            return next(new ErrorHandler_1.default("Activation code not valid", 400));
        }
        const newUser = verifyToken.user;
        const user = await authModel_2.default.create({
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
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// login
exports.memberSignIn = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { password, email } = req.body;
        if (!password || !email) {
            return next(new ErrorHandler_1.default("Please provide all the fields", 400));
        }
        const user = await authModel_2.default.findOne({ email });
        if (!user) {
            return next(new ErrorHandler_1.default("email or password is invalid", 400));
        }
        const passwordCorrect = await user.comparePasswords(password);
        if (!passwordCorrect) {
            return next(new ErrorHandler_1.default("email or password is invalid", 400));
        }
        //create cookies
        const userInstance = new jwt_1.sendToken();
        const { accessToken, refreshToken } = await userInstance.createTokens(user);
        // save refresh token in the db
        if (!user.id) {
            return next(new ErrorHandler_1.default("User ID is missing", 500));
        }
        if (!refreshToken) {
            return next(new ErrorHandler_1.default("Refresh token is missing", 500));
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
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// refresh token
exports.refreshTokens = (0, catchAsyncErrors_1.catchAsyncErrors)(async (user_id, refreshToken) => {
    try {
        const user = await authModel_2.default.findById(user_id);
        if (!user) {
            throw new ErrorHandler_1.default("User not found", 404);
        }
        // Verify refresh token
        if (!user.storedRefreshToken) {
            throw new ErrorHandler_1.default("No refresh token stored for user", 401);
        }
        const isValid = await bcrypt_1.default.compare(refreshToken, user.storedRefreshToken);
        if (!isValid) {
            throw new ErrorHandler_1.default("Invalid refresh token", 401);
        }
        // Generate new tokens
        const userInstance = new jwt_1.sendToken();
        const { accessToken } = await userInstance.createTokens(user);
        return {
            success: true,
            tokens: {
                accessToken
            },
        };
    }
    catch (error) {
        throw new ErrorHandler_1.default(error.message, 400);
    }
});
// logout
exports.memberLogout = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return next(new ErrorHandler_1.default("User not authenticated", 401));
        }
        // Clear refresh token from database
        await authModel_2.default.findByIdAndUpdate(user.id, { storedRefreshToken: null });
        res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// validate session
exports.validateSession = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    const access_token = req.cookies.access_token;
    if (!access_token) {
        return next(new ErrorHandler_1.default("Session not found. Please log in again.", 401));
    }
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(access_token, process.env.ACCESS_TOKEN);
    }
    catch (err) {
        console.log("JWT verification failed:", err.message);
        return next(new ErrorHandler_1.default("Invalid or expired session.", 401));
    }
    if (!decoded || !decoded.id) {
        return next(new ErrorHandler_1.default("Invalid token payload", 401));
    }
    const userFound = await authModel_2.default.findById(decoded.id);
    if (!userFound) {
        console.log(`User ${decoded.id} not found in Redis`);
        return next(new ErrorHandler_1.default("Session expired. Please log in again.", 401));
    }
    // Optional: verify redis user matches JWT if needed
    const user = userFound;
    return res.status(200).json({
        success: true,
        user,
    });
});
// reset token
exports.memberResetToken = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    const { email } = req.body;
    if (!email)
        return next(new ErrorHandler_1.default("Email is required", 400));
    const getMember = await authModel_1.default.findOne({ email });
    if (!getMember)
        return next(new ErrorHandler_1.default("Member not found", 404));
    const tokenGen = await getMember.resetToken();
    await getMember.save({ validateBeforeSave: false });
    const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${tokenGen}`;
    const message = `Forgotten password? Don't worry, click here to reset it:`;
    const data = {
        url: resetUrl,
        name: getMember.firstName,
        message,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtQVCYDri-bQmVrsKUsdNFYFBfL9dVZG8Cw&s",
    };
    await (0, mail_1.sendMail)({
        email: getMember.email,
        subject: "Reset Password Token",
        template: "resetPassword.ejs",
        data,
    }).catch((err) => next(new ErrorHandler_1.default("Email could not be sent", 500)));
    res.status(200).json({
        status: "success",
        resetToken: tokenGen,
        message,
    });
});
exports.resetPassword = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    const tk = req.params.token;
    if (!tk)
        return next(new ErrorHandler_1.default("Token is required", 400));
    const getMember = await authModel_1.default.findOne({
        resetTokenExpires: { $gt: Date.now() }, // Ensure token has not expired
    });
    if (!getMember || !getMember.passwordResetToken)
        return next(new ErrorHandler_1.default("Token is invalid or has expired", 400));
    // 🔹 Use bcrypt.compare to check token validity
    const isMatch = await bcrypt_1.default.compare(tk, getMember.passwordResetToken);
    console.log("Received Token:", tk);
    console.log("Stored Hashed Token in DB:", getMember.passwordResetToken);
    console.log("Does Token Match?:", isMatch);
    if (!isMatch)
        return next(new ErrorHandler_1.default("Token is invalid or has expired", 400));
    getMember.password = req.body.password;
    getMember.passwordResetToken = undefined;
    getMember.resetTokenExpires = undefined;
    await getMember.save();
    res.status(200).json({
        status: "success",
        message: "Password updated successfully",
        redirect: "signIn",
    });
});
// change password
exports.changePassword = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword)
            return next(new ErrorHandler_1.default("Please provide all fields", 400));
        const user = await authModel_1.default.findById(req.user?.id).select("+password");
        if (!user)
            return next(new ErrorHandler_1.default("User not found", 404));
        const isMatch = await user.comparePasswords(oldPassword);
        if (!isMatch)
            return next(new ErrorHandler_1.default("Password is incorrect", 400));
        user.password = newPassword;
        await user.save();
        const data = {
            name: user.firstName,
            date: Date.now(),
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtQVCYDri-bQmVrsKUsdNFYFBfL9dVZG8Cw&s",
            dashboardUrl: `${process.env.CLIENT_URL}/member/settings`,
        };
        // send email to user
        await (0, mail_1.sendMail)({
            email: user.email,
            subject: "Password Changed Successfully",
            template: "passwordChanged.ejs",
            data,
        });
        res.status(200).json({
            status: "success",
            message: "Password updated successfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default("Error fetching quizzes", 500));
    }
});
exports.updateUserBirthday = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { birthday } = req.body;
        console.log(birthday);
        if (!birthday)
            return next(new ErrorHandler_1.default("Birthday is required", 400));
        // Validate birthday
        const today = new Date();
        const birthDate = new Date(birthday);
        if (birthDate > today) {
            return next(new ErrorHandler_1.default("Please enter a valid date of birth", 400));
        }
        const user = await authModel_1.default.findByIdAndUpdate(req.user?.id, { birthday }, { new: true });
        if (!user)
            return next(new ErrorHandler_1.default("User not found", 404));
        res.status(200).json({
            status: "success",
            message: "Birthday updated successfully",
            user,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default("Error fetching quizzes", 500));
    }
});
exports.default = {
    memberSignUp: exports.memberSignUp,
    memberSignIn: exports.memberSignIn,
    refreshTokens: exports.refreshTokens,
    ActivateUser: exports.ActivateUser,
    memberLogout: exports.memberLogout,
    changePassword: exports.changePassword,
    updateUserBirthday: exports.updateUserBirthday,
    memberResetToken: exports.memberResetToken,
    resetPassword: exports.resetPassword,
    validateSession: exports.validateSession,
};
