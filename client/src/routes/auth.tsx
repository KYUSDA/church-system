// routes/AuthRoutes.tsx
import { Route } from "react-router-dom";
import SignUp from "../Auth/SignUp";
import SignInSide from "../Auth/SignIn";
import ResetInSide from "../Auth/ResetToken";
import Newpassword from "../Auth/ResetPassword";
import Verification from "../Auth/verifyAccount";
import ServerDown from "@/LandingPage/Error";

export const AuthRoutes = (
  <>
    <Route path="/signUp" element={<ServerDown />} />
    <Route path="/signIn" element={<ServerDown />} />
    <Route path="/activate-me" element={<Verification />} />
    <Route path="/resetToken" element={<ResetInSide />} />
    <Route path="/resetPassword/:token" element={<Newpassword />} />
  </>
);
