import React, { useEffect, useState } from "react";
import { Mail, MailOpen, Menu, X as Close } from "lucide-react";
import { getBaseUrl } from "../../../services/authService";
import useUserData from "../../../session/authData";
import { useGetAllNotificationsQuery } from "../../../services/authService";

interface Notification {
  id: string;
  title: string;
  description: string;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState("all");
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: notificationsData, isLoading } = useGetAllNotificationsQuery();
  const { user } = useUserData();
  const baseUrl = getBaseUrl();
  const userId = user?.id || null;

  useEffect(() => {
    setLoading(isLoading);
    if (notificationsData && notificationsData.notifications) {
      setNotifications(
        Array.isArray(notificationsData.notifications)
          ? notificationsData.notifications
          : []
      );
      setLoading(false);
    }
  }, [notificationsData, isLoading]);

  const handleSelectNotification = async (notification: Notification) => {
    setSelectedNotification(notification);
    if (!notification.isRead) {
      try {
        await fetch(`${baseUrl}/notification/update-state`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notificationId: notification.id,
            userId,
          }),
        });
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notification.id ? { ...n, isRead: true } : n
          )
        );
      } catch (error) {
        console.error("Failed to update notification state:", error);
      }
    }
    if (window.innerWidth < 768) setIsMobileMenuOpen(false);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "read") return n.isRead;
    if (filter === "unread") return !n.isRead;
    return true;
  });

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Menu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isMobileMenuOpen || !selectedNotification ? "flex" : "hidden"
        } md:flex flex-col w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {["all", "read", "unread"].map((type) => (
              <button
                key={type}
                className={`px-3 py-1 text-sm rounded-md whitespace-nowrap transition-all
                  ${
                    filter === type
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                onClick={() => setFilter(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleSelectNotification(notification)}
                className={`p-3 border-b border-gray-200 cursor-pointer transition-colors
                  ${
                    selectedNotification?.id === notification.id
                      ? "bg-blue-50"
                      : ""
                  }
                  ${
                    !notification.isRead ? "bg-yellow-50" : "hover:bg-gray-50"
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {notification.description}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <Mail size={18} className="text-blue-500" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No notifications found
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`${
          !isMobileMenuOpen || selectedNotification ? "flex" : "hidden"
        } md:flex flex-1 flex-col`}
      >
        {selectedNotification ? (
          <>
            <div className="p-3 md:p-4 border-b border-gray-200 flex justify-between items-center bg-white">
              <button
                onClick={() => setSelectedNotification(null)}
                className="md:hidden mr-2 text-gray-500 hover:text-gray-700"
              >
                <Close />
              </button>
              <h3 className="text-lg font-medium flex-1 truncate">
                {selectedNotification.title}
              </h3>
              <button
                onClick={() => setSelectedNotification(null)}
                className="hidden md:block text-gray-500 hover:text-gray-700"
              >
                <Close />
              </button>
            </div>

            <div className="flex-1 p-3 md:p-4 overflow-y-auto">
              <div className="mb-4 p-3 md:p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 whitespace-pre-line">
                  {selectedNotification.description}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center p-6 max-w-md">
              <MailOpen
                className="mx-auto text-gray-400"
                style={{ fontSize: "3rem" }}
              />
              <h3 className="mt-3 text-lg font-medium text-gray-900">
                No notification selected
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {window.innerWidth < 768
                  ? "Open the menu to select a notification"
                  : "Select a notification from the sidebar"}
              </p>
              {window.innerWidth < 768 && (
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Open Notifications
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
