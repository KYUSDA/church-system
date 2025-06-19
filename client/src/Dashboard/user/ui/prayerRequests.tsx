import { HandHelping, BookOpen, MessageCircle } from "lucide-react"; // Importing icons
import { useState } from "react";
import { getBaseUrl } from "../../../services/authService";
import { toast } from "sonner";
import prayer from "../../../assets/prayer.jpg";

const PrayerRequests = () => {
  const baseUrl = getBaseUrl();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    prayerRequest: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
        credentials: "include",
      });
      if (response.ok) {
        toast.success("Prayer Request Submitted!");
        setFormData({ prayerRequest: "" });
      } else {
        toast.error("Failed to Submit Prayer Request!");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Failed to Submit Prayer Request!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Banner Section */}
      <div className="bg-white text-center py-12 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">Daily Prayer Motivation🙏</h1>
        <p className="text-sm text-gray-700 mt-2">
          Prayer does not bring God down to us, but brings us up to Him.
        </p>
      </div>

      {/* Services Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="flex items-center p-4 bg-white shadow-lg rounded-lg">
          <HandHelping size={40} className="text-blue-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Praise & Worship
            </h3>
            <p className="text-gray-600 mt-2">
              Lift your voice and heart in gratitude. Worship brings us closer
              to God.
            </p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white shadow-lg rounded-lg">
          <BookOpen size={40} className="text-green-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Rejoice in Prayer
            </h3>
            <p className="text-gray-600 mt-2">
              Build a daily habit of prayer and experience the power of God's
              presence.
            </p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-white shadow-lg rounded-lg">
          <MessageCircle size={40} className="text-purple-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Exhortation</h3>
            <p className="text-gray-600 mt-2">
              Be encouraged and strengthened by God's word every morning.
            </p>
          </div>
        </div>
      </div>

      {/* Main Service Section */}
      <div className="mt-12 flex flex-col md:flex-row items-center gap-8">
        <img
          src={prayer}
          alt="Praying in Church"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900">
            Start Your Day with Prayer
          </h2>
          <p className="text-gray-700 mt-4">
            Every morning is an opportunity to deepen your connection with God.
            Set aside time to pray, reflect, and receive His guidance.
          </p>
          <p className="text-gray-700 mt-4">
            Join us in a journey of faith. Let’s make prayer a lifestyle, not
            just a routine. Submit your prayer request, and we will stand with
            you in prayer.
          </p>

          {/* Prayer Request Form */}
          <form onSubmit={handleSubmit}>
            <div className="mt-6">
              <textarea
                value={formData.prayerRequest}
                onChange={handleChange}
                name="prayerRequest"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your prayer request here..."
                rows={4}
              ></textarea>
              <button
                type="submit"
                className="mt-4 px-6 py-3 w-full bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                {isLoading ? "Submitting..." : "Submit a Prayer Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrayerRequests;
