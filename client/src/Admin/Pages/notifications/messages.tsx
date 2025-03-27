import React, { useEffect, useState } from "react";
import { useGetIssuesQuery, TIssue } from "../../services/userServices";
import { ChatBubbleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/userServices";

function Messages() {
  const { data, error, isLoading } = useGetIssuesQuery();
  const [issues, setIssues] = useState<TIssue[]>([]);
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const navigate = useNavigate();

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

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">Error fetching messages</div>;

  // Filter messages based on read/unread state
  const filteredIssues = issues.filter((issue) => {
    if (filter === "read") return issue.isRead;
    if (filter === "unread") return !issue.isRead;
    return true;
  });

  const handleMessageClick = async (id: string) => {
    // Mark as read (assuming backend updates `isRead` status)
    await fetch(`${BASE_URL}/user/update-issue/${id}`, { method: "PATCH" });

    // Navigate to the reply page
    navigate(`/admin/messages/reply/${id}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Messages</h2>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === "read" ? "bg-green-600 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("read")}
        >
          Read
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === "unread" ? "bg-red-600 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("unread")}
        >
          Unread
        </button>
      </div>

      <div className="space-y-4">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((item) => (
            <div
              key={item._id}
              onClick={() => handleMessageClick(item._id)}
              className={`p-4 rounded-lg flex justify-between items-center cursor-pointer 
                ${item.isRead ? "bg-gray-100" : "bg-yellow-100"} hover:bg-gray-200 transition`}
            >
              <div>
                <p className="font-semibold text-blue-900">{item.title}</p>
                <p className="text-gray-700">{item.description}</p>
              </div>
              {/* Reply Icon */}
              <ChatBubbleOutline className="text-blue-600" />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No messages found</div>
        )}
      </div>
    </div>
  );
}

export default Messages;
