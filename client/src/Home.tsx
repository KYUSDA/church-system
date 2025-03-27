
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
import DashboardLayout from "./Dashboard/Layout";
import ProtectedRoute from "./Dashboard/components/ProtectedRoutes";
import QuizzesPage from "./Dashboard/pages/defend/defendYourFaith";
import NotificationsPage from "./Dashboard/pages/Notifications";
import PrayerRequests from "./Dashboard/pages/prayerRequests";
import QuizDetail from "./Dashboard/pages/defend/quizePage";
import KyuSda from "./LandingPage/Gallery/KyuSdaGallery";
import SingleFamily from "./LandingPage/Family/FamiliyDetails";
import TriviaPage from "./Dashboard/pages/trivias/triviaPage";
import TriviaProps from "./Dashboard/pages/trivias/triviasProp";
import CommunicationHub from "./Dashboard/ui/communicationCenter";
import ReportIssue from "./Dashboard/ui/reportIssue";
import Verification from "./Auth/verifyAccount";
import UserList from "./Admin/Pages/User/UserList";
import Newuser from "./Admin/Pages/User/Newuser";
import FamilyList from "./Admin/Pages/Family/FamilyList";
import NewFamily from "./Admin/Pages/Family/NewFamily";
import NewDepartment from "./Admin/Pages/Department/NewDepartment";
import DepartmentList from "./Admin/Pages/Department/DepartmentList";
import ADepartment from "./Admin/Pages/Department/updateDepartment";
import AFamily from "./Admin/Pages/Family/updateFamily";
import Users from "./Admin/Pages/User/editUser";
import AdminLayout from "./Admin/Pages/Layout";
import AdminDashboard from "./Admin/components/dash";
import Messages from "./Admin/Pages/notifications/messages";
import ReplyIssue from "./Admin/Pages/notifications/replyIssue";
import Calendar from "./Admin/components/calendar";

const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/signUp" element={<SignUp /> }></Route>
      <Route path="/signIn" element={<SignInSide />}></Route>
      <Route path="/activate-me" element={<Verification />}></Route>
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
      {/* user dashboard */}
      <Route path="/member/dashboard" element={<ProtectedRoute><DashboardLayout><DashboardHome /></DashboardLayout></ProtectedRoute>}/>
      <Route path="/member/resources" element={<ProtectedRoute><DashboardLayout><ResourceCenter /></DashboardLayout></ProtectedRoute>} />
      <Route path="/member/settings" element={<ProtectedRoute><DashboardLayout><Settings /></DashboardLayout></ProtectedRoute>} />
      <Route path="/member/defend-your-faith" element={<ProtectedRoute><DashboardLayout><QuizzesPage /></DashboardLayout></ProtectedRoute>} />
      <Route path="/member/defend-your-faith/quizze/:id" element={<ProtectedRoute><DashboardLayout><QuizDetail /></DashboardLayout></ProtectedRoute>} />
      <Route path="/member/bibleTrivia" element={<ProtectedRoute><DashboardLayout><TriviaPage /></DashboardLayout></ProtectedRoute>} />
      <Route path="/member/bibleTrivia/trivia/beginner" element={<ProtectedRoute><DashboardLayout><TriviaProps level={"easy"} /></DashboardLayout></ProtectedRoute>} />
      <Route path="/member/bibleTrivia/trivia/intermediate" element={<ProtectedRoute><DashboardLayout><TriviaProps level={"medium"} /></DashboardLayout></ProtectedRoute>} />
      <Route path="/member/bibleTrivia/trivia/advanced" element={<ProtectedRoute><DashboardLayout><TriviaProps level={"hard"} /></DashboardLayout></ProtectedRoute>} />
      <Route path="/member/submit-prayer-request" element={<ProtectedRoute><DashboardLayout><PrayerRequests /></DashboardLayout></ProtectedRoute>} />
      <Route path="/member/user-notifications" element={<ProtectedRoute><DashboardLayout><NotificationsPage /></DashboardLayout></ProtectedRoute>} />
      <Route path="/member/report-issue" element={<ProtectedRoute><DashboardLayout><ReportIssue /></DashboardLayout></ProtectedRoute>} />
      <Route path="/member/communication-center" element={<ProtectedRoute><DashboardLayout><CommunicationHub /></DashboardLayout></ProtectedRoute>} />

      {/* admin dashboard */}
            <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/users" element={<AdminLayout><UserList /></AdminLayout>} />
            <Route path="/admin/users/:id" element={<AdminLayout><Users /></AdminLayout>} />
            <Route path="/admin/newUser" element={<AdminLayout><Newuser /></AdminLayout>} />
            <Route path="/admin/departments" element={<AdminLayout><DepartmentList /></AdminLayout>} />
            <Route path="/admin/department/:id" element={<AdminLayout><ADepartment /></AdminLayout>} />
            <Route path="/admin/newDepart" element={<AdminLayout><NewDepartment /></AdminLayout>} />
            <Route path="/admin/families" element={<AdminLayout><FamilyList /></AdminLayout>} />
            <Route path="/admin/family/:id" element={<AdminLayout><AFamily /></AdminLayout>} />
            <Route path="/admin/calendar" element={<AdminLayout><Calendar /></AdminLayout>} />
            <Route path="/admin/newFamily" element={<AdminLayout><NewFamily /></AdminLayout>} />
            <Route path="/admin/messages" element={<AdminLayout><Messages /></AdminLayout>} />
            <Route path="/admin/messages/reply/:id" element={<AdminLayout><ReplyIssue /></AdminLayout>} />
    </Routes>
  );
};

export default Home;
