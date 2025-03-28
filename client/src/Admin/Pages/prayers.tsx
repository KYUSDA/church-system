import React, { useEffect, useState } from "react";
import { BASE_URL } from "../services/userServices";
import { ChatBubbleOutline, Reply, Close, Menu } from "@mui/icons-material";
import { toast } from "sonner";

interface PrayerRequest {
  _id: number;
  prayerRequest: string;
  date: string;
  name: string;
}

const Prayers = () => {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const [selectedPrayerRequest, setSelectedPrayerRequest] = useState<PrayerRequest | null>(null);
  const [reply, setReply] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPrayerRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/prayers/getAllPrayerRequests`);
      const data = await response.json();
      setPrayerRequests(data.prayerRequests);
    } catch (error) {
      toast.error("Failed to fetch prayer requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayerRequests();
  }, []);

  const filteredPrayerRequests = prayerRequests.filter((request) => {
    if (filter === "read") return request.prayerRequest !== "";
    if (filter === "unread") return request.prayerRequest === "";
    return true;
  });

  const handlePrayerRequestClick = (request: PrayerRequest) => {
    setSelectedPrayerRequest(request);
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleReplySubmit = async () => {
    if (!reply.trim() || !selectedPrayerRequest) return;

    try {
      const res = await fetch(`${BASE_URL}/prayers/reply/${selectedPrayerRequest._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      });

      if (res.ok) {
        alert("Reply sent successfully!");
        setReply("");
        fetchPrayerRequests();
      }
    } catch (err) {
      console.error("Error sending reply: ", err);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Prayer Requests</h2>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Menu />
        </button>
      </div>

      {/* Sidebar - Hidden on mobile when viewing prayer request */}
      <div
        className={`${isMobileMenuOpen || !selectedPrayerRequest ? "flex" : "hidden"} md:flex flex-col w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200`}
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

        {/* Prayer Request List */}
        <div className="flex-1 overflow-y-auto">
          {filteredPrayerRequests.length > 0 ? (
            filteredPrayerRequests.map((request) => (
              <div
                key={request._id}
                onClick={() => handlePrayerRequestClick(request)}
                className={`p-3 border-b border-gray-200 cursor-pointer transition-colors
                  ${selectedPrayerRequest?._id === request._id ? "bg-blue-50" : ""}
                  ${request.prayerRequest === "" ? "bg-yellow-50" : "hover:bg-gray-50"}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{request.name}</p>
                    <p className="text-sm text-gray-600 truncate">{request.prayerRequest}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {new Date(request.date).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No prayer requests found</div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`${!isMobileMenuOpen || selectedPrayerRequest ? "flex" : "hidden"} md:flex flex-1 flex-col`}>
        {selectedPrayerRequest ? (
          <>
            <div className="p-3 md:p-4 border-b border-gray-200 flex justify-between items-center bg-white">
              <button
                onClick={() => setSelectedPrayerRequest(null)}
                className="md:hidden mr-2 text-gray-500 hover:text-gray-700"
              >
                <Close />
              </button>
              <h3 className="text-lg font-medium flex-1 truncate">Prayer Request from {selectedPrayerRequest.name}</h3>
              <button
                onClick={() => setSelectedPrayerRequest(null)}
                className="hidden md:block text-gray-500 hover:text-gray-700"
              >
                <Close />
              </button>
            </div>

            <div className="flex-1 p-3 md:p-4 overflow-y-auto">
              <div className="mb-4 p-3 md:p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    Submitted by: {selectedPrayerRequest.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(selectedPrayerRequest.date).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-line">{selectedPrayerRequest.prayerRequest}</p>
              </div>

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
              <h3 className="mt-3 text-lg font-medium text-gray-900">No prayer request selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                {window.innerWidth < 768 ? "Open the menu to select a prayer request" : "Select a prayer request from the sidebar"}
              </p>
              {window.innerWidth < 768 && (
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Open Prayer Requests
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prayers;
