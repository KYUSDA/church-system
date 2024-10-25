import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/useAuthcontext";
import Mainpage from "./App";
import SignUp from "./components/Member/Signup";
import SignInSide from "./components/Member/SignIn";
import ResetInSide from "./components/Member/ResetToken";
import Newpassword from "./components/Member/Resetpassword";
import MembersDashboard from "./components/Member/MembersDashboard";
import Families from "./components/Families";
import Departments from "./components/Departments";
import SingleFamily from "./components/Family/SingleFamily/SingleFamily";
import DepartmentsDetails from "./components/Department/DepartmentsDetails";
const Home = () => {
  const { user } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<Mainpage />}></Route>
      <Route
        path="/signUp"
        element={!user ? <SignUp /> : <Navigate to="/member" />}
      ></Route>
      <Route
        path="/signIn"
        element={!user ? <SignInSide /> : <Navigate to="/member" />}
      ></Route>
      <Route
        path="/resetToken"
        element={!user ? <ResetInSide /> : <SignInSide />}
      ></Route>
      <Route path="/resetPassword" element={<Newpassword />}></Route>
      <Route
        path="/member"
        element={user ? <MembersDashboard /> : <Navigate to="/signIn" />}
      ></Route>
      <Route path="/families" element={<Families />}></Route>
      <Route path="/families/:id" element={<SingleFamily />} />
      <Route path="/Departments" element={<Departments />}></Route>
      <Route path="/Departments/:id" element={<DepartmentsDetails />} />
      <Route path="/membersDashboard" element={<MembersDashboard />} />
    </Routes>
  );
};

export default Home;
