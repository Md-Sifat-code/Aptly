import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useFetchUserData } from "../Authentication/UserDataContext"; // Import user data hook

const Messages = () => {
  const { senderId, receiverId } = useParams(); // Get sender and receiver IDs from URL
  const { userData } = useFetchUserData(); // Get logged-in user
  const [messages, setMessages] = useState([]); // Messages state
  const [newMessage, setNewMessage] = useState(""); // New message state
  const [chatId, setChatId] = useState(null); // Store chatId

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `https://flatelse.onrender.com/messages/${senderId}/${receiverId}`
        );
        if (!response.ok) throw new Error("Failed to fetch messages");

        const data = await response.json();
        console.log("Fetched messages:", data);
        setMessages(data); // Store messages
        if (data.length > 0) {
          setChatId(data[0].chatId); // Store chatId from first message
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [senderId, receiverId]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      chatId,
      senderId: userData.id, // Send from current user
      recipientId: receiverId, // Send to seller
      content: newMessage,
    };

    setMessages([...messages, newMsg]); // Add to local state
    setNewMessage(""); // Clear input
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 border rounded-lg shadow-md">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderId === userData.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                msg.senderId === userData.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-3 bg-white flex items-center border-t">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
          onClick={sendMessage}
        >
          <FiSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default Messages;
//okk
