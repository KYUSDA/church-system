import React, { useState } from "react";
import { BASE_URL } from "../../services/authService";

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

  // Form state
  const [showStkModal, setShowStkModal] = useState(false);
  const [stkPhone, setStkPhone] = useState("");
  const [stkAmount, setStkAmount] = useState("");
  const [stkSubmitting, setStkSubmitting] = useState(false);
  const [stkMessage, setStkMessage] = useState<string | null>(null);
  const [stkMessageType, setStkMessageType] = useState<"success" | "error" | null>(null);

  // Preset donation amounts
  const presetAmounts = [100, 200, 500, 1000, 2000, 5000];

  // Format phone number to M-Pesa format (254XXXXXXXXX)
  const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digits
    let cleaned = phone.replace(/\D/g, "");
    
    // Handle different input formats
    if (cleaned.startsWith("254")) {
      return cleaned;
    } else if (cleaned.startsWith("0")) {
      // Convert 07XXXXXXXX to 2547XXXXXXXX
      return "254" + cleaned.substring(1);
    } else if (cleaned.startsWith("7") && cleaned.length === 9) {
      // Convert 7XXXXXXXX to 2547XXXXXXXX
      return "254" + cleaned;
    } else if (cleaned.length >= 9) {
      // Assume it's a valid number without country code
      return "254" + cleaned.substring(cleaned.length - 9);
    }
    
    return cleaned;
  };

  // Validate Kenyan phone number
  const validPhone = (p: string): boolean => {
    const formatted = formatPhoneNumber(p);
    // M-Pesa requires: starts with 254, followed by 9 digits (total 12 digits)
    return /^254[17]\d{8}$/.test(formatted);
  };

  // Validate amount
  const validAmount = (a: string): boolean => {
    const n = Number(a);
    return !Number.isNaN(n) && n >= 1; // Minimum 1 KES
  };

  // Handle STK Push payment
  const handleStkPush = async (eventId?: string) => {
    // Reset message
    setStkMessage(null);
    setStkMessageType(null);

    // Validate inputs
    if (!stkPhone.trim()) {
      setStkMessage("Please enter your phone number.");
      setStkMessageType("error");
      return;
    }

    if (!validPhone(stkPhone)) {
      setStkMessage("Please enter a valid Kenyan phone number (e.g., 0712345678 or 254712345678).");
      setStkMessageType("error");
      return;
    }

    if (!stkAmount.trim()) {
      setStkMessage("Please enter an amount.");
      setStkMessageType("error");
      return;
    }

    if (!validAmount(stkAmount)) {
      setStkMessage("Please enter a valid amount (minimum 1 KES).");
      setStkMessageType("error");
      return;
    }

    setStkSubmitting(true);
    setStkMessage("Initiating payment...");
    setStkMessageType(null);

    try {
      // Use the same BASE_URL pattern as other services
      const url = `${BASE_URL}/mpesa/stk-push`;

      // Format phone number before sending
      const formattedPhone = formatPhoneNumber(stkPhone);
      const amount = Number(stkAmount);

      const res = await fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formattedPhone,
          amount: amount,
          eventId: eventId || events[0]?.title,
        }),
      });

      // Parse response
      const text = await res.text();
      let body: any = null;
      const ct = (res.headers.get("content-type") || "").toLowerCase();
      
      try {
        body = ct.includes("application/json") ? JSON.parse(text) : { message: text };
      } catch {
        body = { message: text || "Unknown error" };
      }

      if (!res.ok) {
        const errMsg = body?.message || body?.error || `Request failed (${res.status})`;
        throw new Error(errMsg);
      }

      // Success
      setStkMessage(body?.message || "STK Push sent successfully! Please check your phone to complete the payment.");
      setStkMessageType("success");
      
      // Clear form and close modal after delay
      setTimeout(() => {
        setShowStkModal(false);
        setStkPhone("");
        setStkAmount("");
        setStkMessage(null);
        setStkMessageType(null);
      }, 4000);
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to initiate STK push. Please try again.";
      setStkMessage(errorMessage);
      setStkMessageType("error");
    } finally {
      setStkSubmitting(false);
    }
  };

  // Handle preset amount selection
  const handlePresetAmount = (amount: number) => {
    setStkAmount(amount.toString());
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

              <div className="mt-4 flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setShowStkModal(true);
                    setStkAmount("500");
                    setStkMessage(null);
                    setStkMessageType(null);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Pay with M-Pesa (STK Push)
                </button>
                <p className="text-xs text-gray-500 text-center">
                  Quick and secure mobile money payment
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STK Modal */}
      {showStkModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => !stkSubmitting && setShowStkModal(false)}
          />
          <div className="bg-white rounded-lg p-6 z-10 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Pay with M-Pesa (STK Push)</h3>
              {!stkSubmitting && (
                <button
                  onClick={() => setShowStkModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              )}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
              <p className="text-sm text-blue-700">
                <strong>Security Note:</strong> Do NOT enter your M-Pesa PIN in this app. 
                You will be prompted to enter it on your phone to complete the payment.
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                value={stkPhone}
                onChange={(e) => setStkPhone(e.target.value)}
                placeholder="0712345678 or 254712345678"
                disabled={stkSubmitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter your M-Pesa registered phone number
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Amount (KES)
              </label>
              
              {/* Preset Amount Buttons */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handlePresetAmount(amount)}
                    disabled={stkSubmitting}
                    className={`p-2 text-sm font-medium rounded-lg border-2 transition-colors ${
                      stkAmount === amount.toString()
                        ? "border-teal-500 bg-teal-50 text-teal-700"
                        : "border-gray-200 hover:border-teal-300 text-gray-700"
                    } disabled:opacity-50`}
                  >
                    KES {amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <input
                value={stkAmount}
                onChange={(e) => setStkAmount(e.target.value)}
                type="number"
                min="1"
                step="1"
                placeholder="Enter custom amount"
                disabled={stkSubmitting}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100"
              />
            </div>

            {/* Message Display */}
            {stkMessage && (
              <div
                className={`p-3 rounded-lg mb-4 ${
                  stkMessageType === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : stkMessageType === "error"
                    ? "bg-red-50 text-red-800 border border-red-200"
                    : "bg-blue-50 text-blue-800 border border-blue-200"
                }`}
              >
                <p className="text-sm font-medium">{stkMessage}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => handleStkPush(events[0]?.title)}
                disabled={stkSubmitting}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {stkSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Send STK Push
                  </>
                )}
              </button>
              {!stkSubmitting && (
                <button
                  onClick={() => {
                    setShowStkModal(false);
                    setStkPhone("");
                    setStkAmount("");
                    setStkMessage(null);
                    setStkMessageType(null);
                  }}
                  className="px-4 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationPage;