import React, { useState } from "react";
import { Mail, MailOpen, CheckCircle } from "lucide-react";

const notificationsData = [
  { id: 1, title: "System Update", message: "A new system update is available.", isRead: false },
  { id: 2, title: "New Message", message: "You have received a new message from support.", isRead: true },
  { id: 3, title: "Payment Received", message: "Your payment has been processed successfully.", isRead: false },
  { id: 4, title: "Security Alert", message: "Unusual login activity detected.", isRead: true },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [filter, setFilter] = useState("All");

  const handleSelectNotification = (notification) => {
    setSelectedNotification(notification);
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
    );
  };

  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, isRead: !n.isRead } : n
      )
    );
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "Read") return n.isRead;
    if (filter === "Unread") return !n.isRead;
    return true;
  });

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Notifications List */}
      <div className="w-1/3 p-4 border-r bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Notifications</h2>
          <select
            className="p-2 border rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Read">Read</option>
            <option value="Unread">Unread</option>
          </select>
        </div>

        <div className="space-y-2">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg cursor-pointer flex items-center justify-between ${
                notification.isRead ? "bg-white" : "bg-blue-100"
              }`}
              onClick={() => handleSelectNotification(notification)}
            >
              <div className="flex items-center gap-2">
                {notification.isRead ? <MailOpen size={20} /> : <Mail size={20} />}
                <p className="font-medium">{notification.title}</p>
              </div>
              <button
                className="text-gray-500"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleReadStatus(notification.id);
                }}
              >
                {notification.isRead ? <CheckCircle size={18} /> : <Mail size={18} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Notification Details */}
      <div className="w-2/3 p-6">
        {selectedNotification ? (
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">{selectedNotification.title}</h2>
            <p className="text-gray-600">{selectedNotification.message}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Select a notification to view details</p>
        )}
      </div>
    </div>
  );
}
