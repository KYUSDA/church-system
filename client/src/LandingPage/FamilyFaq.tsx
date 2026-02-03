import React, { useState } from "react";
import { faQuestions } from "../Dummy/FAQ";

const FamilyFAQ = () => {
  // State to track which FAQ is open
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Function to toggle FAQ visibility
  const toggleFAQ = (id: number | null) => {
    setOpenFAQ((prevOpen) => (prevOpen === id ? null : id));
  };

  return (
    <div>
      <section className="bg-[#255760] bg-center bg-no-repeat bg-cover pb-12 relative">
        <div className="mx-auto h-auto pb-5">
          <h2 className="text-center font-bold text-[32px] md:text-4xl text-white pt-5 mb-5">
            Most Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-4 lg:mx-8">
            {faQuestions.map((faq) => (
              <div
                className="shadow-[3px_13px_24px_-1px_rgba(20,20,20,0.75)] pb-4 cursor-pointer rounded-xl overflow-hidden"
                key={faq.id}
              >
                {/* Question Section */}
                <div
                  className="flex justify-between items-center bg-[var(--fourth-color)] p-4 text-[#0e2125] cursor-pointer"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <h3 className="text-base md:text-lg font-bold text-slate-200">
                    {faq.id}. {faq.question}
                  </h3>
                  <svg
                    width="15"
                    height="10"
                    viewBox="0 0 42 25"
                    className={`transition-transform duration-300 flex-shrink-0 ml-2 ${
                      openFAQ === faq.id ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <path
                      d="M3 3L21 21L39 3"
                      stroke="white"
                      strokeWidth="7"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                {/* Answer Section */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out rounded-md mt-1 text-gray-200 text-sm md:text-base leading-relaxed ${
                    openFAQ === faq.id
                      ? "max-h-[300px] opacity-100 px-4 py-2.5"
                      : "max-h-0 opacity-0 px-4 py-0"
                  }`}
                >
                  <p className="pt-4 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FamilyFAQ;
