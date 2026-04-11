import { useState } from "react";
import { faQuestions } from "../Dummy/FAQ";

const FamilyFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-gray-100 py-16 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* ── Header ── */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-7 h-0.5 bg-blue-600 rounded-full" />
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-blue-600">
              Got Questions?
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal leading-[1.1] tracking-tight text-slate-900 mb-4">
            Frequently Asked <em className="italic text-blue-600">Questions</em>
          </h2>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-lg">
            Everything you need to know. Can't find what you're looking for?{" "}
            <a
              href="/contact"
              className="text-blue-600 font-medium hover:underline"
            >
              Reach out to us.
            </a>
          </p>
        </div>

        {/* ── FAQ List ── */}
        <div className="flex flex-col gap-3">
          {faQuestions.map((faq, index) => {
            const isOpen = openFAQ === faq.id;
            return (
              <div
                key={faq.id}
                className={`group rounded-2xl border bg-white overflow-hidden
                            transition-all duration-300 ease-out
                            ${
                              isOpen
                                ? "border-blue-200 shadow-[0_8px_30px_-6px_rgba(37,99,235,0.12)]"
                                : "border-stone-200 hover:border-blue-100 hover:shadow-sm"
                            }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Question Row */}
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                >
                  {/* Number + Question */}
                  <div className="flex items-center gap-4 min-w-0">
                    <span
                      className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full
                                  text-[12px] font-bold transition-colors duration-300
                                  ${
                                    isOpen
                                      ? "bg-blue-600 text-white"
                                      : "bg-stone-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500"
                                  }`}
                    >
                      {String(faq.id).padStart(2, "0")}
                    </span>
                    <h3
                      className={`text-base sm:text-lg font-semibold leading-snug transition-colors duration-200
                                  ${isOpen ? "text-blue-600" : "text-slate-800 group-hover:text-slate-900"}`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  {/* Chevron Icon */}
                  <span
                    className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full
                                transition-all duration-300
                                ${
                                  isOpen
                                    ? "bg-blue-600 text-white rotate-180"
                                    : "bg-stone-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 rotate-0"
                                }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 5l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`transition-all duration-300 ease-out overflow-hidden
                              ${isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="px-6 pb-6">
                    {/* Divider */}
                    <div className="w-full h-px bg-stone-100 mb-4" />
                    <p className="text-sm sm:text-base leading-relaxed text-slate-500 pl-12">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FamilyFAQ;
