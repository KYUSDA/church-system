import React, { useState } from "react";
import { Loader2 } from "lucide-react";

const DonationPage = () => {
  const [form, setForm] = useState({ name: "", amount: "", email: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const events = [
    { 
      title: "Fundraiser for Our Mission",
      badge: "Mission",
      date: "April 27, 2025",
      description: "Join us in supporting our church mission. Every contribution counts!" },
  ];

  const validate = () => {
    let newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.amount) newErrors.amount = "Amount is required";
    else if (isNaN(form.amount) || form.amount <= 0) newErrors.amount = "Invalid amount";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setErrors({});
    setTimeout(() => {
      alert("Donation successful! Thank you for your generosity.");
      setLoading(false);
      setForm({ name: "", amount: "", email: "" });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row items-center p-6 space-y-6 md:space-y-0 md:space-x-8">
      {/* Left Section: Events */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold text-teal-700 mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 border border-teal-300">
              <h3 className="flex justify-between items-center text-lg font-semibold text-teal-700">{event.title} 
                <span className="py-1 px-2 text-sm bg-teal-400 rounded-full text-white">#{event.badge}</span></h3>
              <p className="text-gray-600 text-sm">{event.date}</p>
              <p className="text-gray-700 mt-2">{event.description}</p>

              <div className="mt-6 p-4 bg-gray-50 border-t-2 border-teal-500 rounded-md">
                <h3 className="text-lg font-bold text-teal-700">Equity Bank Payment Details</h3>
                <p className="text-gray-700 mt-2">Paybill: <span className="font-semibold">247247</span></p>
                <p className="text-gray-700">Account Number: <span className="font-semibold">768769#MISSION</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Donation Form */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full md:w-1/2 border border-teal-400">
        <h2 className="text-2xl font-bold text-center text-teal-700">Support Our Church</h2>
        <p className="text-center text-gray-600 mt-2">Donate securely via Equity Bank</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="amount" className="block font-medium text-gray-700">Donation Amount (KES)</label>
            <input
              id="amount"
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center disabled:opacity-50"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Donate Now"}
          </button>
        </form>
        <div className="mt-6 p-4 bg-gray-50 border-t-2 border-teal-500 rounded-md">
          <h3 className="text-lg font-bold text-teal-700">Equity Bank Payment Details</h3>
          <p className="text-gray-700 mt-2">Paybill: <span className="font-semibold">247247</span></p>
          <p className="text-gray-700">Account Number: <span className="font-semibold">768769#MISSION</span></p>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
