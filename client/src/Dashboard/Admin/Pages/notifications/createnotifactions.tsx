import { useState } from "react";
import { toast } from "sonner";

const NotificationPage = () => {
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    recipients: "All Members",
  });
  const [preview, setPreview] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNotification((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
      // Replace with your API endpoint
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notification),
      });
      toast.success("Notification sent successfully!");
      setNotification({ title: "", message: "", recipients: "All Members" });
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Compose Notification</h1>

        {/* Notification Form */}
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Notification Title"
            value={notification.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="message"
            placeholder="Notification Message"
            value={notification.message}
            onChange={handleChange}
            className="w-full p-2 border rounded h-32"
          />
          <select
            name="recipients"
            value={notification.recipients}
            onChange={(e) => handleChange(e as React.ChangeEvent<HTMLSelectElement>)}
            className="w-full p-2 border rounded"
          >
            <option value="All Members">All Members</option>
            <option value="Specific Group">Specific Group</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setPreview(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Preview Notification
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Send Notification
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Preview Notification</h3>
            <p><strong>Title:</strong> {notification.title}</p>
            <p><strong>Message:</strong> {notification.message}</p>
            <p><strong>Recipients:</strong> {notification.recipients}</p>
            
            {/* Close Preview */}
            <button
              onClick={() => setPreview(false)}
              className="mt-6 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
