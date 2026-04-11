import { useNavigate } from "react-router-dom";

export default function DonationsCTA() {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate("/donation");
  };

  return (
    <section className="overflow-hidden min-h-[60vh] bg-[#fafaf8] flex items-center justify-center px-6 md:px-12">
      <div className="relative z-10 max-w-4xl text-center space-y-6">
        <h1 className="text-3xl font-semibold text-gray-900 relative inline-block">
          Support <span className="text-blue-500 font-medium">OUR MISSION</span>
          <span className="block w-16 h-1 bg-blue-500 mt-1"></span>
        </h1>
        <p className="text-base md:text-lg max-w-2xl mx-auto">
          Your generous donation helps us continue spreading love, faith, and
          support to our community. Every contribution makes a difference.
        </p>
        <button
          onClick={handleDonateClick}
          className="mt-4 inline-block bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl text-white font-semibold px-8 py-3 rounded-xl hover:bg-yellow-300 transition"
        >
          Donate Now
        </button>
      </div>
    </section>
  );
}
