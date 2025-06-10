import { useState, useEffect } from "react";
import useUserData from "../../session/authData";
import { getBaseUrl } from "../../services/authService";

const SubscriptionSection = () => {
  const { userData, user } = useUserData();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [message, setMessage] = useState("");
  const baseUrl = getBaseUrl();

  useEffect(() => {
    if (userData?.email) {
      setEmail(userData.email);
    }
  }, [userData]);


  useEffect(() => {
    const checkSubscription = async () => {
      if (!email) return;

      try {
        const response = await fetch(
          `${baseUrl}/devotion/getOneSubscriber/${encodeURIComponent(email)}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const data = await response.json();
        setIsSubscribed(data.subscribed);
      } catch (error) {
        console.error("Error checking subscription:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [email]);

  const handleSubscription = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    setSubscribing(true);
    setMessage("");

    try {
      const response = await fetch(`${baseUrl}/devotion/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Subscription successful! You'll receive daily devotions.");
        setIsSubscribed(true);
      } else {
        setMessage("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="mt-6 bg-white rounded-xl p-4 shadow-lg">
      <h4 className="text-lg font-semibold mb-2">
        Subscribe for Daily Devotions
      </h4>
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
          disabled={isSubscribed || subscribing}
        />
        <button
          onClick={handleSubscription}
          className={`px-4 py-2 rounded-lg transition ${
            isSubscribed || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          disabled={isSubscribed || loading || subscribing}
        >
          {loading
            ? "Checking..."
            : subscribing
            ? "Subscribing..."
            : isSubscribed
            ? "Subscribed"
            : "Subscribe"}
        </button>
      </div>
      {message && <p className="mt-2 text-sm text-red-700">{message}</p>}
    </div>
  );
};

export default SubscriptionSection;
