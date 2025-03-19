import { useState, useEffect } from "react";
import { TUser } from "../components/userdata";
import { getBaseUrl } from "../../services/authService";

const SubscriptionSection = ({ user }:{user: TUser}) => {
  const [email, setEmail] = useState(user?.email || "");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState("");
    const baseUrl = getBaseUrl();

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const response = await fetch(`${baseUrl}/devotion/getOneSubscriber`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();
        setIsSubscribed(data.subscribed);
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
    };

    if (user) checkSubscription();
  }, [user]);

  const handleSubscription = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/devotion/subscribe-devotions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Subscription successful! You'll receive daily devotions.");
        setIsSubscribed(true); // Update button state
      } else {
        setMessage("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="mt-6 bg-white rounded-xl p-4 shadow-lg">
      <h4 className="text-lg font-semibold mb-2">Subscribe for Daily Devotions</h4>
      <p className="text-sm text-gray-600 mb-3">
        Enter your email to receive devotions directly to your inbox.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubscribed} // Disable input if subscribed
        />
        <button
          onClick={handleSubscription}
          className={`px-4 py-2 rounded-lg transition ${isSubscribed ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          disabled={isSubscribed} // Disable button if subscribed
        >
          {isSubscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      {message && <p className="mt-2 text-sm text-red-700">{message}</p>}
    </div>
  );
};

export default SubscriptionSection;
