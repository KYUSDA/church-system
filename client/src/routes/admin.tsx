import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../session/ProtectedRoutes";
import AdminLayout from "../Dashboard/Admin/Layout";
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
import AdminsManage from "../Dashboard/Admin/Pages/adminsmanage";
import Profile from "../Dashboard/Admin/components/profile";
import Calendar from "../Dashboard/Admin/components/calendar";

export const Admin = (
  <>
    <Route
      path="/admin/dashboard"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/users"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <UserList />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/users/:id"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <Users />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/newUser"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <NewUser />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/departments"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <DepartmentList />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/department/:id"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <ADepartment />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/newDepart"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <NewDepartment />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/families"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <FamilyList />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/family/:id"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <AFamily />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/calendar"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <Calendar />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/newFamily"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <NewFamily />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/messages"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <Messages />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/create-notification"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <NotificationPage />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/weekly-quiz"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <QuizAdminPanel />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/prayers"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <Prayers />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/admin-manage"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <AdminsManage />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/admin-profile"
      element={
        <ProtectedRoute>
          <AdminLayout>
            <Profile />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
  </>
);
