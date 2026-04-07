import React from "react";
import { Route, Outlet } from "react-router-dom";
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
import DashboardHome from "../Dashboard/user/pages/DashboardHome";
import Settings from "../Dashboard/user/pages/Settings";
import QuizzesPage from "../Dashboard/user/pages/defend/defendYourFaith";
import QuizDetail from "../Dashboard/user/pages/defend/quizePage";
import PrayerRequests from "../Dashboard/user/pages/prayerRequests";
import EventCalendar from "../Dashboard/user/pages/calendarEvents";
import ResourceCenter from "../Dashboard/user/pages/ResourceCenter";
import BibleApp from "../Dashboard/user/pages/bible";
import InboxPage from "@/Dashboard/user/pages/Inbox";
import Help from "@/Dashboard/user/pages/Help";
import Tithes from "@/Dashboard/user/pages/Tithes";

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
      path="/admin"
      element={
        <AdminRoute>
          <UnifiedDashboard>
            <Outlet />
          </UnifiedDashboard>
        </AdminRoute>
      }
    >
      <Route index element={<AdminDashboard />} />
      <Route path="users" element={<UserList />} />
      <Route path="users/:id" element={<Users />} />
      <Route path="users/new" element={<NewUser />} />
      <Route path="departments" element={<DepartmentList />} />
      <Route path="departments/:id" element={<ADepartment />} />
      <Route path="departments/new" element={<NewDepartment />} />
      <Route path="families" element={<FamilyList />} />
      <Route path="families/:id" element={<AFamily />} />
      <Route path="families/new" element={<NewFamily />} />
      <Route path="calendar" element={<AdminCalendar />} />
      <Route path="messages" element={<Messages />} />
      <Route path="create-notifications" element={<NotificationPage />} />
      <Route path="prayer-requests" element={<Prayers />} />
      <Route path="weekly-quiz" element={<QuizAdminPanel />} />
      <Route path="profile" element={<AdminProfile />} />
      <Route path="resources/new" element={<NewResource />} />
    </Route>

    {/* Member Routes */}
    <Route
      path="/member"
      element={
        <MemberRoute>
          <UnifiedDashboard>
            <Outlet />
          </UnifiedDashboard>
        </MemberRoute>
      }
    >
      <Route path="dashboard" element={<DashboardHome />} />
      <Route path="resources" element={<ResourceCenter />} />
      <Route path="settings" element={<Settings />} />
      <Route path="defend-your-faith" element={<QuizzesPage />} />
      <Route path="defend-your-faith/quizze/:id" element={<QuizDetail />} />
      <Route path="bible-app" element={<BibleApp />} />
      <Route path="submit-prayer-request" element={<PrayerRequests />} />
      <Route path="my-calendar" element={<EventCalendar />} />
      <Route path="inbox" element={<InboxPage />} />
      <Route path="tithes-offerings" element={<Tithes />} />
      <Route path="profile" element={<Settings />} />
      <Route path="help" element={<Help />} />
    </Route>
  </>
);
