import { useNavigate } from "react-router-dom";

export default function DonationsCTA() {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate("/donation");
  };

  return (
    <section
      className="text-white relative overflow-hidden min-h-[60vh] flex items-center justify-center px-6 md:px-12"
      style={{
        backgroundImage: "url('/bible.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-4xl text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">Support Our Mission</h2>
        <p className="text-base md:text-lg text-gray-100 max-w-2xl mx-auto">
          Your generous donation helps us continue spreading love, faith, and
          support to our community. Every contribution makes a difference.
        </p>
        <button
          onClick={handleDonateClick}
          className="mt-4 inline-block bg-yellow-400 text-blue-900 font-semibold px-8 py-3 rounded-xl hover:bg-yellow-300 transition"
        >
          Donate Now
        </button>
      </div>
    </section>
  );
}
