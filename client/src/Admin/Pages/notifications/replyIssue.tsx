import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/userServices";
import { ArrowBack } from "@mui/icons-material";

function ReplyIssue() {
  const { id } = useParams(); // Get issue ID from URL
  const navigate = useNavigate();
  const [issue, setIssue] = useState<{ title: string; description: string } | null>(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await fetch(`${BASE_URL}/user/get-issue/${id}`);
        if (res.ok) {
          const data = await res.json();
          setIssue(data);
        }
      } catch (err) {
        console.error("Error fetching issue: ", err);
      }
    };

    fetchIssue();
  }, [id]);

  const handleReplySubmit = async () => {
    if (!reply.trim()) return;

    try {
      const res = await fetch(`${BASE_URL}/user/reply/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      });

      if (res.ok) {
        alert("Reply sent successfully!");
        navigate("/messages"); // Redirect back to messages
      }
    } catch (err) {
      console.error("Error sending reply: ", err);
    }
  };

  if (!issue) return <div className="text-center p-4">Loading issue...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Back Button */}
      <button
        className="flex items-center mb-4 text-blue-600 hover:text-blue-800"
        onClick={() => navigate(-1)}
      >
        <ArrowBack className="mr-1" /> Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Reply to Issue</h2>

      <div className="bg-gray-100 p-4 rounded">
        <p className="font-semibold">{issue.title}</p>
        <p className="text-gray-700">{issue.description}</p>
      </div>

      <textarea
        className="w-full border p-2 mt-4 rounded"
        rows={4}
        placeholder="Type your reply here..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleReplySubmit}
      >
        Send Reply
      </button>
    </div>
  );
}

export default ReplyIssue;
