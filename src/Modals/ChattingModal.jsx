import React, { useState } from "react";
import { FaTimes, FaPaperPlane, FaUserCircle } from "react-icons/fa";

const ChattingModal = ({ closeModal, username }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: messageInput, sender: "user" },
      ]);
      setMessageInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full sm:w-[30rem] h-full sm:h-[500px] rounded-lg shadow-lg flex flex-col">
        {/* Header */}
        <div className="bg-teal-700 text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
          <h2 className="text-lg font-bold flex items-center">
            <FaUserCircle className="mr-2" size={20} />
            Chat with {username}
          </h2>
          <button
            onClick={closeModal}
            className="text-white hover:text-gray-300"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Message Display Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                    message.sender === "user"
                      ? "bg-teal-700 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No messages yet.</p>
          )}
        </div>

        {/* Message Input */}
        <div className="border-t p-4 flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 flex items-center"
          >
            <FaPaperPlane className="mr-1" size={16} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChattingModal;
