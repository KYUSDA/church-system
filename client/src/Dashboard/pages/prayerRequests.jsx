import React, { useState } from "react";

const PrayerRequests = () => {
  const [formData, setFormData] = useState({
    name: "",
    request: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Prayer Request Submitted:", formData);
    setFormData({ name: "", request: "" });
    alert("Your prayer request has been submitted.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-6">Submit a Prayer Request</h1>
      <p className="text-sm text-gray-800 mb-4 bg-blue-50 p-3 rounded-md">
        <strong>NOTE:</strong> Your prayer request will be kept confidential and not disclosed by any means.
      </p>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Your Name (Optional)</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Prayer Request</label>
          <textarea
            name="request"
            value={formData.request}
            onChange={handleChange}
            rows={4}
            required
            placeholder="Enter your prayer request"
            className="w-full px-3 py-2 border rounded-md"
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default PrayerRequests;
