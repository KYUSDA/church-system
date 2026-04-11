import { useState, FormEvent } from "react";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! Welcome to KYUSDA Church website, I'm your helper 😊. How can I assist you?",
      isBot: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages([
        ...messages,
        { text: inputMessage, isBot: false },
        { text: "Thanks for your message! I'll help you with that.", isBot: true },
      ]);
      setInputMessage("");
    }
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-end">
      {/* Chatbot Window */}
      {isChatOpen && (
        <div className="bg-white rounded-xl shadow-lg p-4 w-72 sm:w-80 lg:w-96 h-[50vh] flex flex-col">
          <div className="flex justify-between items-center pb-2 border-b">
            <h3 className="font-semibold">Church Assistant</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-2 p-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  msg.isBot ? "bg-gray-100" : "bg-blue-100 ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Field */}
          <form onSubmit={handleSendMessage} className="flex gap-2 mt-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Chatbot Icon */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M21 10c0 7-9 11-9 11s-9-4-9-11a9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ChatBot;