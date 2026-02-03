import { Router } from "express";
import memberAuth from "../Controlers/authControler";
import requireAuth from "../middleware/authmiddleware";
const authRoute = Router();

authRoute.route("/signUp").post(memberAuth.memberSignUp);

authRoute.post("/signIn", memberAuth.memberSignIn);

authRoute.post("/activate-me",memberAuth.ActivateUser);

authRoute.post("/logout", requireAuth, memberAuth.memberLogout);

authRoute.get("/validate-session", requireAuth, memberAuth.validateSession);
  

authRoute.post(
  "/update-accesstoken",
  memberAuth.refreshTokens
);

authRoute.route("/resetToken").post(memberAuth.memberResetToken);

authRoute.patch("/resetPassword/:token", memberAuth.resetPassword);

authRoute.patch("/change-password", requireAuth, memberAuth.changePassword);

export default authRoute;
