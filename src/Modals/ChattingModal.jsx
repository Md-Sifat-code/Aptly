import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { io } from "socket.io-client";

const ChattingModal = ({ closeModal, loggedInUsername, sellerUsername }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // Typing indicator
  const [socket, setSocket] = useState(null);
  const messageEndRef = useRef(null);

  // Connect to WebSocket on mount and handle socket events
  useEffect(() => {
    const socketURL =
      process.env.NODE_ENV === "production"
        ? "ws://baribazar.onrender.com/ws" // Production URL
        : "ws://localhost:3000/ws"; // Local URL for development

    const socketInstance = io(socketURL);
    setSocket(socketInstance);

    // Authenticate with logged-in username
    socketInstance.emit("login", loggedInUsername);

    // Listen for incoming messages
    socketInstance.on("newMessage", (message) => {
      if (
        message.to === loggedInUsername ||
        message.sender === loggedInUsername ||
        message.to === sellerUsername ||
        message.sender === sellerUsername
      ) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), text: message.text, sender: message.sender },
        ]);
      }
    });

    // Listen for typing status
    socketInstance.on("userTyping", (username) => {
      if (username !== loggedInUsername) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000); // Typing indicator disappears after 3 seconds
      }
    });

    return () => {
      socketInstance.disconnect(); // Cleanup on component unmount
    };
  }, [loggedInUsername, sellerUsername]);

  // Scroll to the latest message when a new one arrives
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle message input and typing status
  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
    if (e.target.value.trim()) {
      socket.emit("userTyping", loggedInUsername); // Notify that the user is typing
    }
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (messageInput.trim() && socket) {
      const message = {
        text: messageInput,
        sender: loggedInUsername,
        to: sellerUsername,
      };

      // Emit the message to the server
      socket.emit("sendMessage", message);

      // Update local state for instant feedback
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: messageInput, sender: loggedInUsername },
      ]);

      setMessageInput(""); // Clear the input after sending
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full sm:w-[30rem] h-full sm:h-[500px] rounded-lg shadow-lg flex flex-col">
        {/* Header */}
        <div className="bgc text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
          <h2 className="text-lg font-bold flex items-center">
            <FaUserCircle className="mr-2" size={20} />
            Chat with {sellerUsername}
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
                  message.sender === loggedInUsername
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                    message.sender === loggedInUsername
                      ? "bgc text-white"
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
          <div ref={messageEndRef} />
        </div>

        {/* Typing Indicator */}
        {isTyping && (
          <div className="text-sm text-gray-500 text-center mt-2">
            The other user is typing...
          </div>
        )}

        {/* Message Input */}
        <div className="border-t p-4 flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Type your message..."
            value={messageInput}
            onChange={handleInputChange}
          />
          <button
            onClick={handleSendMessage}
            className="bgc text-white px-4 py-2 rounded-lg hover:bg-teal-800 flex items-center"
            disabled={!messageInput.trim()} // Disable button if input is empty
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
