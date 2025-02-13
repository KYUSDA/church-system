import { useState } from 'react';

const QuickActions = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! Welcome to KYUSDA Church website, am your helper guy 😊, how can i be of help ?", isBot: true }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            setMessages([...messages,
            { text: inputMessage, isBot: false },
            { text: "Thanks for your message! I'll help you with that.", isBot: true }
            ]);
            setInputMessage('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-8 right-8 flex flex-col w-[20vw]">
            {/* Chat Bot */}
            {isChatOpen && (
                <div className="bg-white rounded-xl shadow-lg p-4  mb-4 h-[50vh] relative">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold">Church Assistant</h3>
                        <button
                            onClick={() => setIsChatOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="h-64 mb-4 space-y-2 overflow-y-auto mb-2">
                        {messages.map((msg, index) => (
                            <div key={index} className={`p-2 rounded-lg ${msg.isBot ? 'bg-gray-100' : 'bg-blue-100 ml-auto'}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSendMessage} className="absolute bottom-0 flex gap-2 py-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            className="flex-1 px-3 py-2 border rounded-lg"
                            placeholder="Type your message..."
                        />
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                            Send
                        </button>
                    </form>
                </div>
            )}

            {/* Quick Actions Card */}
            <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Quick Actions</h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-2">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">
                        Submit Prayer Request
                    </button>
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg">
                        Make Contribution
                    </button>
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg"
                    >
                        Open Chat Assistant
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuickActions;
