import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/useAuthcontext";
import MainPage from "./App";
import SignUp from "./pages/SignUp";
import SignInSide from "./pages/SignIn";
import ResetInSide from "./pages/ResetToken";
import NewPassword from "./pages/ResetPassword";
import MembersDashboard from "./pages/MembersDashboard";
import Families from "./pages/Families";
import Departments from "./pages/Departments";
import SingleFamily from "./pages/SingleFamily";
import DepartmentsDetails from "./components/Department/DepartmentsDetails";
const Home = () => {
  const { user } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
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
      <Route path="/resetPassword" element={<NewPassword />}></Route>
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
