import { Router } from "express";
import memberAuth from "../Controlers/authControler";
import requireAuth, { requireRefreshToken } from "../middleware/authmiddleware";
const authRoute = Router();

authRoute.route("/signUp").post(memberAuth.memberSignUp);

authRoute.post("/signIn", memberAuth.memberSignIn);

authRoute.post("/activate-me",memberAuth.ActivateUser);

authRoute.post("/logout", requireAuth, memberAuth.memberLogout);

authRoute.post(
  "/update-accesstoken",
  requireRefreshToken,
  memberAuth.UpdateAccessToken
);

authRoute.route("/resetToken").post(memberAuth.memberResetToken);

authRoute.patch("/resetPassword/:token", memberAuth.resetPassword);

authRoute.patch("/change-password", requireAuth, memberAuth.changePassword);

authRoute.patch("/update-birthday", requireAuth, memberAuth.updateUserBirthday);

export default authRoute;
