import memberAuth from "../Models/authModel.js";
import sendEmail from "../utilities/email.js";
import { createHash } from "crypto";
import pkg from "jsonwebtoken";

const { sign } = pkg;

let maxAge = 60 * 60;
let extendedMaxAge = 3 * 24 * 60 * 60;
const createJWT = (id, rememberMe) => {
  const tokenMaxAge = rememberMe ? extendedMaxAge : maxAge;
  return sign({ id }, process.env.SECRET, {
    expiresIn: tokenMaxAge,
  });
};

const memberSignUp = async (req, resp) => {
  try {
    const memberRegistered = await memberAuth.create(req.body);
    const id = memberRegistered._id;
    //generate token and pass the cookie inside.
    const tk = createJWT(id);
    resp.cookie("kyuSdaMember", tk, { httpOnly: true, maxAge: maxAge * 1000 });
    resp.status(200).json({
      id: id,
      status: "success",
      email: memberRegistered.email,
      tk,
    });
  } catch (error) {
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

const memberSignIn = async (req, resp) => {
  try {
    const { email, password, rememberMe } = req.body;
    const loggedMember = await memberAuth.login(email, password);
    const id = loggedMember._id;
    const tk = createJWT(id, rememberMe);
    resp.cookie("kyuSdaMember", tk, { httpOnly: true, maxAge: maxAge * 1000 });
    resp.status(200).json({
      id,
      status: "success",
      email: loggedMember.email,
      tk,
    });
  } catch (err) {
    resp.status(404).json({
      status: "failure",
      err: err.message,
    });
  }
};

const memberResetToken = async (req, resp) => {
  try {
    const { email } = req.body;
    //generate a token from methods
    let getMember = await memberAuth.findOne({ email });
    const tokenGen = await getMember.resetToken();
    //save to database
    await getMember.save({ validateBeforeSave: false });
    const resetUrl = `${req.protocol}://localhost:3000/resetPassword`;
    const message = `sorry,we heard you lost your password, don't worry click here to reset it:`;
    await sendEmail({
      email: getMember.email,
      subject: "your reset token ,expires in the next 1hr (60min)",
      url: resetUrl,
      message: message,
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

const resetPassword = async (req, resp) => {
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
      getMember.resetTokenSetAt = Date.now();
      getMember.passwordResetToken = undefined;
      getMember.resetTokenExpires = undefined;
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
  memberResetToken,
  resetPassword,
};
