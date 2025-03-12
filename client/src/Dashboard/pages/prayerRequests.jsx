import React, { useState } from "react";
import { getBaseUrl } from "../../utils/api";
import { toast } from "sonner";

const PrayerRequests = () => {

  const baseUrl = getBaseUrl();
  const [isLoading, setisLoading] = useState(false);


  const [formData, setFormData] = useState({
    name: "",
    prayerRequest: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    const url = `${baseUrl}/prayers/prayerRequest`;

    try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
    toast.success("Prayer Request Submitted!");
    setFormData({ name: "", prayerRequest: "" });
    }else{
    toast.error("Failed to Submit Prayer Request!");
    setisLoading(false);
    }}
    catch (error) {
      console.error("Prayer Request Failed:", error);
      toast.error("Failed to Submit Prayer Request!");
    }
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
            name="prayerRequest"
            value={formData.prayerRequest}
            onChange={handleChange}
            rows={4}
            required
            placeholder="Enter your prayer request"
            className="w-full px-3 py-2 border rounded-md"
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
         {isLoading ? "Submitting..." : "Submit Prayer Request"}
        </button>
      </form>
    </div>
  );
};

export default PrayerRequests;
