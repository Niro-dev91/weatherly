import { useState } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

export default function WeatherChatBot({ city }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatReply, setChatReply] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const handleChatSend = async () => {
    if (!chatMessage.trim()) return;

    setChatLoading(true);
    setChatReply('');

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: chatMessage.trim(),
          city: city.trim() || 'Colombo',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setChatReply(data.message || 'Failed to get chatbot reply.');
        return;
      }

      setChatReply(data.reply || 'No reply received.');
      setChatMessage('');
    } catch {
      setChatReply('Network error while contacting chatbot.');
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setChatOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition duration-300"
        title={chatOpen ? 'Close Weather Bot' : 'Open Weather Bot'}
      >
        {chatOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </button>

      {/* Side popup */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white shadow-2xl z-40 transform transition-transform duration-300 border-l border-blue-100 ${
          chatOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Weather AI</h2>
              <p className="text-sm text-blue-100">
                Ask about weather, clothes, or rain
              </p>
            </div>

            <button
              onClick={() => setChatOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 bg-blue-50">
            {!chatReply ? (
              <div className="text-sm text-gray-600 bg-white border border-blue-100 rounded-2xl p-4 shadow-sm">
                Try asking:
                <div className="mt-2 space-y-1 text-gray-700">
                  <p>• Will it rain today?</p>
                  <p>• Give me a weather summary</p>
                  <p>• Is it good to go outside now?</p>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-blue-100 rounded-2xl p-4 shadow-sm">
                <p className="text-sm font-semibold text-blue-700 mb-2">
                 AI Reply
                </p>
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                  {chatReply}
                </p>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-blue-100 bg-white">
            <textarea
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Ask about the weather..."
              className="w-full border border-blue-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              rows={3}
              disabled={chatLoading}
            />

            <button
              onClick={handleChatSend}
              disabled={chatLoading}
              className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <FiSend size={18} />
              {chatLoading ? 'Thinking...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}