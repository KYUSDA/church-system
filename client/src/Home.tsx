
import { Routes, Route } from "react-router-dom";
import MainPage from "./App";
import SignUp from "./Auth/SignUp";
import SignInSide from "./Auth/SignIn";
import ResetInSide from "./Auth/ResetToken";
import Newpassword from "./Auth/ResetPassword";
import Families from "./LandingPage/Family/Families";
import Departments from "./LandingPage/Department/Departments";
import DepartmentsDetails from "./LandingPage/Department/DepartmentsDetails";
import PrivacyPolicy from "./LandingPage/Footer/Policy";
import Terms from "./LandingPage/Footer/Terms";
import Layout from "./LandingPage/Footer/Layout";
import DonationPage from "./LandingPage/donation/donation";
import DashboardHome from "./Dashboard/pages/DashboardHome";
import ResourceCenter from "./Dashboard/pages/ResourceCenter";
import Settings from "./Dashboard/pages/Settings";
import BibleTrivia from "./Dashboard/pages/BibleTrivia";
import DashboardLayout from "./Dashboard/Layout";
import ProtectedRoute from "./Dashboard/components/ProtectedRoutes";
import QuizzesPage from "./Dashboard/pages/defend/defendYourFaith";
import NotificationsPage from "./Dashboard/pages/Notifications";
import PrayerRequests from "./Dashboard/pages/prayerRequests";
import QuizDetail from "./Dashboard/pages/defend/quizePage";
import KyuSda from "./LandingPage/Gallery/KyuSdaGallery";
import SingleFamily from "./LandingPage/Family/FamiliyDetails";

const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/signUp" element={<SignUp /> }></Route>
      <Route path="/signIn" element={<SignInSide />}></Route>
      <Route path="/resetToken" element={<ResetInSide />}></Route>
      <Route path="/resetPassword" element={<Newpassword />}></Route>
      <Route path="/families" element={<Layout><Families /></Layout>}></Route>
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
      <Route path="/member/defend-your-faith/quizze/:id" element={<ProtectedRoute><DashboardLayout><QuizDetail /></DashboardLayout></ProtectedRoute>} />
      <Route path="/member/bibleTrivia" element={<ProtectedRoute><DashboardLayout><BibleTrivia /></DashboardLayout></ProtectedRoute>} />
      <Route path="/member/submit-prayer-request" element={<ProtectedRoute><DashboardLayout><PrayerRequests /></DashboardLayout></ProtectedRoute>} />
      <Route path="/member/user-notifications" element={<ProtectedRoute><DashboardLayout><NotificationsPage /></DashboardLayout></ProtectedRoute>} />
    </Routes>
  );
};

export default Home;
