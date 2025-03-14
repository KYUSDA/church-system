import { Router } from "express";
import memberAuth from "../Controlers/authControler";
import requireAuth from "../middleware/authmiddleware";
const authRoute = Router();

authRoute.route("/signUp").post(memberAuth.memberSignUp);

authRoute.post("/signIn", memberAuth.memberSignIn);

authRoute.post("/logout", requireAuth, memberAuth.memberLogout);

authRoute.route("/resetToken").post(memberAuth.memberResetToken);

authRoute.route("/resetPassword/:token").patch(memberAuth.resetPassword);

export default authRoute;
