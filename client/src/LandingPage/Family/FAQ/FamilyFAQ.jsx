
// export default FamilyFAQ;
import React, { useState } from "react";
import { faQuestions } from "../../../Dummy/FAQ";
import './Faq.css'
const FamilyFAQ = () => {
    // State to track which FAQ is open
    const [openFAQ, setOpenFAQ] = useState(null);

    // Function to toggle FAQ visibility
    const toggleFAQ = (id) => {
        setOpenFAQ((prevOpen) => (prevOpen === id ? null : id));
    };

    return (
        <div>
            <section className="faqs">
                <div className="container">
                    <h2 className="heading">Most Asked Questions</h2>
                    <div className="let-them-ask">
                        <div className="row faq-row">
                            <div className="col">
                                {faQuestions.map((faq) => (
                                    <div className="faq" key={faq.id}>
                                        {/* Question Section */}
                                        <div
                                            className="question"
                                            onClick={() => toggleFAQ(faq.id)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <h3 className="text-slate-200">{faq.id}. {faq.question}</h3>
                                            <svg
                                                width="15"
                                                height="10"
                                                viewBox="0 0 42 25"
                                                style={{
                                                    transform: openFAQ === faq.id ? "rotate(180deg)" : "rotate(0deg)",
                                                    transition: "transform 0.3s",
                                                }}
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
                                            className={`answer ${
                                                openFAQ === faq.id ? "show" : "hide"
                                            }`}
                                        >
                                            <p className="para-line white">{faq.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FamilyFAQ;