import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/useAuthcontext";
import MainPage from "./App";
import SignUp from "./pages/Auth/SignUp";
import SignInSide from "./pages/Auth/SignIn";
import ResetInSide from "./pages/Auth/ResetToken";
import Newpassword from "./pages/Auth/ResetPassword";
import Families from "./pages/Families";
import Departments from "./components/Department/Departments";
import SingleFamily from "./pages/SingleFamily";
import DepartmentsDetails from "./components/Department/DepartmentsDetails";
import PrivacyPolicy from "./components/Footer/Policy";
import Terms from "./components/Footer/Terms";
import Layout from "./components/Footer/Layout";
import { KyuSda } from "./container";
import DonationPage from "./components/donation/donation";
import DashboardHome from "./Dashboard/pages/DashboardHome";
import ResourceCenter from "./Dashboard/pages/ResourceCenter";
import Settings from "./Dashboard/pages/Settings";
import BibleTrivia from "./Dashboard/pages/BibleTrivia";
import Family from "./Dashboard/pages/Family";
import DashboardLayout from "./Dashboard/Layout";
import ProtectedRoute from "./Dashboard/components/ProtectedRoutes";
import QuizzesPage from "./Dashboard/pages/LessonDiscussion";

const Home = () => {
  const { user } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route
        path="/signUp"
        element={!user ? <SignUp /> : <Navigate to="/member/dashboard" />}
      ></Route>
      <Route
        path="/signIn"
        element={!user ? <SignInSide /> : <Navigate to="/member/dashboard" />}
      ></Route>
      <Route
        path="/resetToken"
        element={!user ? <ResetInSide /> : <SignInSide />}
      ></Route>
      <Route path="/resetPassword" element={<Newpassword />}></Route>
    
      <Route path="/families" element={<Families />}></Route>
      <Route path="/families/:id" element={<Layout><SingleFamily /></Layout>} />
      <Route path="/Departments" element={<Layout><Departments /></Layout>}></Route>
      <Route path="/Departments/:id" element={<Layout><DepartmentsDetails /></Layout>} />
      <Route path="/donation" element={<Layout><DonationPage /></Layout>} />
      <Route path="/church-gallery" element={<Layout><KyuSda /></Layout>} />
      <Route path="/kirinyaga-adventist-privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
      <Route path="/kirinyaga-adventist-terms-and-conditions" element={<Layout><Terms /></Layout>} />

      {/* dashboard */}
    <Route path="/member/dashboard" element={<ProtectedRoute><DashboardLayout><DashboardHome /></DashboardLayout></ProtectedRoute>}/>
    <Route path="/member/resources" element={<ProtectedRoute><DashboardLayout><ResourceCenter /></DashboardLayout></ProtectedRoute>} />
    <Route path="/member/settings" element={<ProtectedRoute><DashboardLayout><Settings /></DashboardLayout></ProtectedRoute>} />
    <Route path="/member/defend-your-faith" element={<ProtectedRoute><DashboardLayout><QuizzesPage /></DashboardLayout></ProtectedRoute>} />
    <Route path="/member/bibleTrivia" element={<ProtectedRoute><DashboardLayout><BibleTrivia /></DashboardLayout></ProtectedRoute>} />
    <Route path="/member/family" element={<ProtectedRoute><DashboardLayout><Family /></DashboardLayout></ProtectedRoute>} />
    </Routes>
  );
};

export default Home;
