
import { Route } from "react-router-dom";
import {
  AdminRoute,
  MemberRoute,
  AuthenticatedRoute,
} from "../session/ProtectedRoutes";
import UnifiedDashboard from "../Dashboard/UnifiedDashboard";

// Import Admin Components
import AdminDashboard from "../Dashboard/Admin/components/dash";
import UserList from "../Dashboard/Admin/Pages/User/UserList";
import Users from "../Dashboard/Admin/Pages/User/editUser";
import NewUser from "../Dashboard/Admin/Pages/User/Newuser";
import DepartmentList from "../Dashboard/Admin/Pages/Department/DepartmentList";
import ADepartment from "../Dashboard/Admin/Pages/Department/updateDepartment";
import NewDepartment from "../Dashboard/Admin/Pages/Department/NewDepartment";
import FamilyList from "../Dashboard/Admin/Pages/Family/FamilyList";
import AFamily from "../Dashboard/Admin/Pages/Family/updateFamily";
import NewFamily from "../Dashboard/Admin/Pages/Family/NewFamily";
import Messages from "../Dashboard/Admin/Pages/notifications/messages";
import NotificationPage from "../Dashboard/Admin/Pages/notifications/createnotifactions";
import QuizAdminPanel from "../Dashboard/Admin/Pages/defend/weeklyQuiz";
import Prayers from "../Dashboard/Admin/Pages/prayers";
import AdminProfile from "../Dashboard/Admin/components/profile";
import AdminCalendar from "../Dashboard/Admin/components/calendar";
import NewResource from "../Dashboard/Admin/Pages/resources/newResource";

// Import Member Components
import DashboardHome from "../Dashboard/user/ui/DashboardHome";
import Settings from "../Dashboard/user/ui/Settings";
import QuizzesPage from "../Dashboard/user/pages/defend/defendYourFaith";
import QuizDetail from "../Dashboard/user/pages/defend/quizePage";
import TriviaPage from "../Dashboard/user/pages/trivias/triviaPage";
import TriviaProps from "../Dashboard/user/pages/trivias/triviasProp";
import PrayerRequests from "../Dashboard/user/ui/prayerRequests";
import EventCalendar from "../Dashboard/user/ui/calendarEvents";
import ResourceCenter from "../Dashboard/user/ui/ResourceCenter";
import BibleApp from "../Dashboard/user/pages/bible";

export const DashboardRoutes = (
  <>
    {/* Unified Dashboard Route */}
    <Route
      path="/dashboard"
      element={
        <AuthenticatedRoute>
          <UnifiedDashboard />
        </AuthenticatedRoute>
      }
    />

    {/* Admin Routes */}
    <Route
      path="/dashboard/admin"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <AdminDashboard />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/users"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <UserList />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/users/:id"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <Users />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/users/new"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <NewUser />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/departments"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <DepartmentList />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/departments/:id"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <ADepartment />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/departments/new"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <NewDepartment />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/families"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <FamilyList />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/families/:id"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <AFamily />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/family/:id"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <AFamily />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/newFamily"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <NewFamily />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/families/new"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <NewFamily />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/calendar"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <AdminCalendar />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/messages"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <Messages />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/create-notifications"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <NotificationPage />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/create-notification"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <NotificationPage />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/prayer-requests"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <Prayers />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/prayers"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <Prayers />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/weekly-quiz"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <QuizAdminPanel />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/profile"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <AdminProfile />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/admin-profile"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <AdminProfile />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/resources/new"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <NewResource />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />
    <Route
      path="/admin/newResource"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <NewResource />
          </UnifiedDashboard>
        </AdminRoute>
      }
    />

    {/* Member Routes */}
    <Route
      path="/member/dashboard"
      element={
        <MemberRoute>
          <UnifiedDashboard>
            <DashboardHome />
          </UnifiedDashboard>
        </MemberRoute>
      }
    />
    <Route
      path="/member/resources"
      element={
        <MemberRoute>
          <UnifiedDashboard>
            <ResourceCenter />
          </UnifiedDashboard>
        </MemberRoute>
      }
    />
    <Route
      path="/member/settings"
      element={
        <MemberRoute>
          <UnifiedDashboard>
            <Settings />
          </UnifiedDashboard>
        </MemberRoute>
      }
    />
    <Route
      path="/member/defend-your-faith"
      element={
        <MemberRoute>
          <UnifiedDashboard>
            <QuizzesPage />
          </UnifiedDashboard>
        </MemberRoute>
      }
    />
    <Route
      path="/member/defend-your-faith/quizze/:id"
      element={
        <MemberRoute>
          <UnifiedDashboard>
            <QuizDetail />
          </UnifiedDashboard>
        </MemberRoute>
      }
    />
    <Route
      path="/member/bible-app"
      element={
        <MemberRoute>
          <UnifiedDashboard>
            <BibleApp />
          </UnifiedDashboard>
        </MemberRoute>
      }
    />
    <Route
      path="/member/bibleTrivia"
      element={
        <MemberRoute>
          <UnifiedDashboard>
            <TriviaPage />
          </UnifiedDashboard>
        </MemberRoute>
      }
    />
    <Route
      path="/member/bibleTrivia/trivia/beginner"
      element={
        <MemberRoute>
          <UnifiedDashboard>
            <TriviaProps level={"easy"} />
          </UnifiedDashboard>
        </MemberRoute>
      }
    />
    <Route
      path="/member/bibleTrivia/trivia/intermediate"
      element={
        <MemberRoute>
          <UnifiedDashboard>
            <TriviaProps level={"medium"} />
          </UnifiedDashboard>
        </MemberRoute>
      }
    />
    <Route
      path="/member/bibleTrivia/trivia/advanced"
      element={
        <MemberRoute>
          <UnifiedDashboard>
            <TriviaProps level={"hard"} />
          </UnifiedDashboard>
        </MemberRoute>
      }
    />
    <Route
      path="/member/submit-prayer-request"
      element={
        <MemberRoute>
          <UnifiedDashboard>
            <PrayerRequests />
          </UnifiedDashboard>
        </MemberRoute>
      }
    />
    <Route
      path="/member/my-calendar"
      element={
        <MemberRoute>
          <UnifiedDashboard>
            <EventCalendar />
          </UnifiedDashboard>
        </MemberRoute>
      }
    />
    <Route
      path="/member/profile"
      element={
        <MemberRoute>
          <UnifiedDashboard>
            <Settings />
          </UnifiedDashboard>
        </MemberRoute>
      }
    />
  </>
);
