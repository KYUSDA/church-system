import { Router } from "express";
import memberAuth from "../Controlers/authControler.js";
const authRoute = Router();

authRoute.route("/signUp").post(memberAuth.memberSignUp);

authRoute.route("/signIn").post(memberAuth.memberSignIn);

authRoute.route("/resetToken").post(memberAuth.memberResetToken);

authRoute.route("/resetPassword/:token").patch(memberAuth.resetPassword);

export default authRoute;
