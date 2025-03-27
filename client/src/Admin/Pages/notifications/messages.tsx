import React, { useEffect, useState } from "react";
import { useGetIssuesQuery, TIssue } from "../../services/userServices";
import { ChatBubbleOutline, Reply, Close, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/userServices";

function Messages() {
  const { data, error, isLoading } = useGetIssuesQuery();
  const [issues, setIssues] = useState<TIssue[]>([]);
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const [selectedIssue, setSelectedIssue] = useState<TIssue | null>(null);
  const [reply, setReply] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  

  const getIssues = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user/get-issues`);
      if (res.ok) {
        const data = await res.json();
        setIssues(data.data);
      }
    } catch (err) {
      console.error("Error fetching issues: ", err);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  const filteredIssues = issues.filter((issue) => {
    if (filter === "read") return issue.isRead;
    if (filter === "unread") return !issue.isRead;
    return true;
  });

  const handleMessageClick = async (issue: TIssue) => {
    try {
      await fetch(`${BASE_URL}/user/update-issue/${issue._id}`, { method: "PATCH" });
      setSelectedIssue(issue);
      getIssues();
      if (window.innerWidth < 768) {
        setIsMobileMenuOpen(false);
      }
    } catch (err) {
      console.error("Error updating issue: ", err);
    }
  };

  const handleReplySubmit = async () => {
    if (!reply.trim() || !selectedIssue) return;

    try {
      const res = await fetch(`${BASE_URL}/user/reply/${selectedIssue._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      });

      if (res.ok) {
        alert("Reply sent successfully!");
        setReply("");
        getIssues();
      }
    } catch (err) {
      console.error("Error sending reply: ", err);
    }
  };

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">Error fetching messages</div>;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Menu />
        </button>
      </div>

      {/* Sidebar - Hidden on mobile when viewing message */}
      <div
        className={`${isMobileMenuOpen || !selectedIssue ? "flex" : "hidden"} md:flex flex-col w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200`}
      >
        {/* Filter Controls */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {["all", "read", "unread"].map((type) => (
              <button
                key={type}
                className={`px-3 py-1 text-sm rounded-md whitespace-nowrap transition-all
                  ${filter === type ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                onClick={() => setFilter(type as "all" | "read" | "unread")}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto">
          {filteredIssues.length > 0 ? (
            filteredIssues.map((item) => (
              <div
                key={item._id}
                onClick={() => handleMessageClick(item)}
                className={`p-3 border-b border-gray-200 cursor-pointer transition-colors
                  ${selectedIssue?._id === item._id ? "bg-blue-50" : ""}
                  ${!item.isRead ? "bg-yellow-50" : "hover:bg-gray-50"}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-sm text-gray-600 truncate">{item.description}</p>
                  </div>
                  {!item.isRead && (
                    <span className="ml-2 flex-shrink-0 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No messages found</div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`${!isMobileMenuOpen || selectedIssue ? "flex" : "hidden"} md:flex flex-1 flex-col`}>
        {selectedIssue ? (
          <>
            <div className="p-3 md:p-4 border-b border-gray-200 flex justify-between items-center bg-white">
              <button
                onClick={() => setSelectedIssue(null)}
                className="md:hidden mr-2 text-gray-500 hover:text-gray-700"
              >
                <Close />
              </button>
              <h3 className="text-lg font-medium flex-1 truncate">{selectedIssue.title}</h3>
              <button
                onClick={() => setSelectedIssue(null)}
                className="hidden md:block text-gray-500 hover:text-gray-700"
              >
                <Close />
              </button>
            </div>

            <div className="flex-1 p-3 md:p-4 overflow-y-auto">
              {/* Original Message */}
              <div className="mb-4 p-3 md:p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-900">
                   userId: {selectedIssue.user || "Anonymous"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(selectedIssue.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-line">{selectedIssue.description}</p>
              </div>

              {/* Replies */}
              {selectedIssue.replies?.length > 0 && (
                <div className="space-y-3 mb-4">
                  <h4 className="font-medium text-gray-900">Replies</h4>
                  {selectedIssue.replies.map((reply, index) => (
                    <div key={index} className="p-3 md:p-4 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-gray-900">Admin</span>
                        <span className="text-xs text-gray-500">
                          {new Date(reply.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-line">{reply.message}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Form */}
              <div className="border-t border-gray-200 pt-3 md:pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Reply</h4>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Type your reply here..."
                ></textarea>
                <button
                  onClick={handleReplySubmit}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center w-full sm:w-auto"
                >
                  <Reply className="mr-2" fontSize="small" />
                  Send Reply
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center p-6 max-w-md">
              <ChatBubbleOutline className="mx-auto text-gray-400" style={{ fontSize: '3rem' }} />
              <h3 className="mt-3 text-lg font-medium text-gray-900">No message selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                {window.innerWidth < 768 ? "Open the menu to select a message" : "Select a message from the sidebar"}
              </p>
              {window.innerWidth < 768 && (
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Open Messages
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;