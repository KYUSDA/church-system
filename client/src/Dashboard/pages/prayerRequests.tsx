import React, { useState } from "react";
import { getBaseUrl } from "../../services/authService";
import { toast } from "sonner";

const PrayerRequests = () => {
  const baseUrl = getBaseUrl();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    prayerRequest: "",
  });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    const url = `${baseUrl}/prayers/prayerRequest`;

    interface ResponseData {
      ok: boolean;
    }

    try {
      const response: ResponseData = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Prayer Request Submitted!");
        setFormData({ name: "", prayerRequest: "" });
      } else {
        toast.error("Failed to Submit Prayer Request!");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Prayer Request Failed:", error);
      toast.error("Failed to Submit Prayer Request!");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 py-8 space-y-8 lg:space-y-0 lg:space-x-8">
      {/* Left Side: Encouraging Words */}
      <div className="lg:w-1/2 text-center lg:text-left p-6 bg-blue-50 rounded-lg shadow-lg">
        <img
          src="https://i.pinimg.com/736x/d7/b5/10/d7b51016b17782784d7f3d79eacbeda6.jpg"
          alt="Encouraging words"
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold mb-4">Encouragement Through Prayer</h2>
        <p className="text-gray-700">
          Prayer is a sacred privilege that connects us with God, allowing us to speak with Him as a friend and receive His guidance, strength, and peace. No matter our burdens, anxieties, or joys, we are invited to bring everything before Him. God welcomes us into His presence, promising to hear and answer our prayers in ways that are for our ultimate good.
        </p>
        <p className="mt-4 text-gray-700">
          Through prayer, we can live in the light of Christ’s presence, finding courage, wisdom, and comfort in every circumstance. It is a spiritual necessity that strengthens us against temptation and fills our lives with divine grace. No matter where we are—amid daily tasks, trials, or moments of solitude—our prayers rise to heaven, never burdening or wearying God.
        </p>
      </div>

      {/* Right Side: Prayer Request Form */}
      <div className="lg:w-1/2 p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Submit a Prayer Request</h1>
        <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default PrayerRequests;
