import React from "react";
import { faQuestions } from "../../../Dummy/FAQ";
import './FamilyFAQ.css';
const FamilyFAQ = () => {
    return (
        <div>
            <section className="faqs">
                <div className="container">
                    <h2 className="heading">Most Asked Questions</h2>
                    <div className="let-them-ask">
                        <div className="row faq-row">
                            <div className="col">
                                {
                                    faQuestions.map((faq) => (
                                        <div className="faq">
                                            <div className="question">
                                                <h3>{faq.id}. {faq.question}</h3>
                                                <svg width="15" height="10" viewBox="0 0 42 25">
                                                    <path d="M3 3L21 21L39 3" stroke="white" stroke-width="7" stroke-linecap="round" />
                                                </svg>
                                            </div>
                                            <div className="answer">
                                                <p className="para-line white">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FamilyFAQ;
