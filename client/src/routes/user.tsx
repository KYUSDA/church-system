import { Route } from "react-router-dom";
import ProtectedRoute from "../session/ProtectedRoutes";
import DashboardLayout from "../Dashboard/user/Layout";
import DashboardHome from "../Dashboard/user/ui/DashboardHome";
import Settings from "../Dashboard/user/ui/Settings";
import QuizzesPage from "../Dashboard/user/pages/defend/defendYourFaith";
import QuizDetail from "../Dashboard/user/pages/defend/quizePage";
import TriviaPage from "../Dashboard/user/pages/trivias/triviaPage";
import TriviaProps from "../Dashboard/user/pages/trivias/triviasProp";
import PrayerRequests from "../Dashboard/user/ui/prayerRequests";
import NotificationsPage from "../Dashboard/user/ui/Notifications";
import ReportIssue from "../Dashboard/user/ui/reportIssue";
import EventCalendar from "../Dashboard/user/ui/calendarEvents";
import ResourceCenter from "../Dashboard/user/ui/ResourceCenter";
import BibleApp from "../Dashboard/user/pages/bible";

export const User = (
  <>
    {/* user dashboard */}
    <Route
      path="/member/dashboard"
      element={
        <ProtectedRoute>
          <DashboardLayout>
            <DashboardHome />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/member/resources"
      element={
        <ProtectedRoute>
          <DashboardLayout>
            <ResourceCenter />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/member/settings"
      element={
        <ProtectedRoute>
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/member/defend-your-faith"
      element={
        <ProtectedRoute>
          <DashboardLayout>
            <QuizzesPage />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/member/defend-your-faith/quizze/:id"
      element={
        <ProtectedRoute>
          <DashboardLayout>
            <QuizDetail />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/member/bible-app"
      element={
        <ProtectedRoute>
          <DashboardLayout>
            <BibleApp />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/member/bibleTrivia"
      element={
        <ProtectedRoute>
          <DashboardLayout>
            <TriviaPage />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/member/bibleTrivia/trivia/beginner"
      element={
        <ProtectedRoute>
          <DashboardLayout>
            <TriviaProps level={"easy"} />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/member/bibleTrivia/trivia/intermediate"
      element={
        <ProtectedRoute>
          <DashboardLayout>
            <TriviaProps level={"medium"} />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/member/bibleTrivia/trivia/advanced"
      element={
        <ProtectedRoute>
          <DashboardLayout>
            <TriviaProps level={"hard"} />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/member/submit-prayer-request"
      element={
        <ProtectedRoute>
          <DashboardLayout>
            <PrayerRequests />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/member/user-notifications"
      element={
        <ProtectedRoute>
          <DashboardLayout>
            <NotificationsPage />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/member/report-issue"
      element={
        <ProtectedRoute>
          <DashboardLayout>
            <ReportIssue />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/member/my-calendar"
      element={
        <ProtectedRoute>
          <DashboardLayout>
            <EventCalendar />
          </DashboardLayout>
        </ProtectedRoute>
      }
    />
  </>
);
