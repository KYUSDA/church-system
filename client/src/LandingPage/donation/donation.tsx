import React, { useState } from "react";
const DonationPage: React.FC = () => {
  const events = [
    {
      title: "MISSION 2025",
      badge: "MISSION 2025",
      date: "December, 2025",
      description:
        "We welcome you to join us in spreading the gospel through evangelism. You can't afford to miss this!",
    },
  ];

  // existing form state...
  const [showStkModal, setShowStkModal] = useState(false);
  const [stkPhone, setStkPhone] = useState("");
  const [stkAmount, setStkAmount] = useState("");
  const [stkSubmitting, setStkSubmitting] = useState(false);
  const [stkMessage, setStkMessage] = useState<string | null>(null);

  const validPhone = (p: string) => /^[0-9+]{6,15}$/.test(p);
  const validAmount = (a: string) => {
    const n = Number(a);
    return !Number.isNaN(n) && n > 0;
  };

const handleStkPush = async (eventId?: string) => {
    if (!validPhone(stkPhone) || !validAmount(stkAmount)) {
      setStkMessage("Enter a valid phone and amount.");
      return;
    }
    setStkSubmitting(true);
    setStkMessage(null);
    try {
      const apiBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
      // Use /mpesa/stk-push route
      const url = apiBase ? `${apiBase}/mpesa/stk-push` : "/mpesa/stk-push";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: stkPhone,
          amount: Number(stkAmount),
          eventId,
        }),
      });
      // safe parsing: read text first, then try to parse JSON
      const text = await res.text();
      let body: any = null;
      const ct = (res.headers.get("content-type") || "").toLowerCase();
      try {
        body = ct.includes("application/json") ? JSON.parse(text) : { message: text };
      } catch {
        body = { message: text || null };
      }

      if (!res.ok) {
        const errMsg = body?.message || `Request failed (${res.status})`;
        throw new Error(errMsg);
      }

      setStkMessage(body?.message || "STK Push sent — check your phone.");
      setTimeout(() => {
        setShowStkModal(false);
        setStkPhone("");
        setStkAmount("");
      }, 2500);
    } catch (err: any) {
      setStkMessage(err?.message || "Failed to trigger STK push.");
    } finally {
      setStkSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-2">
      {/* Left Section: Events */}
      <div className="w-full md:w-1/2">
        <h2 className="text-center text-2xl md:text-4xl font-bold my-8 md:mt-12 md:mb-16">
          Support <span className="text-teal-500">Our</span> Programs
        </h2>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 border border-teal-300"
            >
              <h3 className="flex justify-between items-center text-lg font-semibold text-teal-700">
                {event.title}
                <span className="py-1 px-2 text-sm bg-teal-400 rounded-full text-white">
                  #{event.badge}
                </span>
              </h3>
              <p className="text-gray-600 text-sm">{event.date}</p>
              <p className="text-gray-700 mt-2">{event.description}</p>

              <div className="mt-6 p-4 bg-gray-50 border-t-2 border-teal-500 rounded-md">
                <h3 className="text-lg font-bold text-teal-700">
                  Equity Bank Payment Details
                </h3>
                <p className="text-gray-700 mt-2">
                  Paybill: <span className="font-semibold">247247</span>
                </p>
                <p className="text-gray-700">
                  Account Number: <span className="font-semibold">768769#SUPPORT</span>
                </p>
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => {
                    setShowStkModal(true);
                    setStkAmount("500"); // optional default
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Pay with MPesa (STK)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STK Modal */}
      {showStkModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowStkModal(false)}
          />
          <div className="bg-white rounded-lg p-6 z-10 w-full max-w-md">
            <h3 className="text-lg font-bold mb-3">Pay with MPesa (STK Push)</h3>

            <p className="text-sm text-red-600 mb-2">
              Do NOT enter your M-Pesa PIN in this app. You will be prompted to enter it on your phone.
            </p>

            <label className="block text-sm text-gray-600">Phone</label>
            <input
              value={stkPhone}
              onChange={(e) => setStkPhone(e.target.value)}
              placeholder="+2547xxxxxxxx"
              className="w-full mt-1 p-2 border rounded mb-3"
            />

            <label className="block text-sm text-gray-600">Amount (KES)</label>
            <input
              value={stkAmount}
              onChange={(e) => setStkAmount(e.target.value)}
              type="number"
              min="1"
              className="w-full mt-1 p-2 border rounded mb-4"
            />

            <div className="flex items-center justify-between">
              <button
                onClick={() => handleStkPush(events[0]?.title)}
                disabled={stkSubmitting}
                className="bg-teal-500 disabled:opacity-60 text-white px-4 py-2 rounded"
              >
                {stkSubmitting ? "Sending..." : "Send STK Push"}
              </button>
              <button
                onClick={() => setShowStkModal(false)}
                className="text-gray-600 px-3 py-2 rounded"
              >
                Cancel
              </button>
            </div>

            {stkMessage && <p className="mt-3 text-sm text-gray-700">{stkMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationPage;