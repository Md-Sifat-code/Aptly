import React, { useEffect, useState, useContext } from "react";
import { FiSend } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useFetchUserData } from "../Authentication/UserDataContext";
import WebSocketContext from "../Authentication/WebSocketContext";

const Messages = () => {
  const { senderId, recipientId } = useParams(); // Get sender & recipient ID from URL
  const { userData } = useFetchUserData(); // Get logged-in user
  const { stompClient, sendMessage } = useContext(WebSocketContext); // Get WebSocket client and sendMessage function
  const [newMessageInput, setNewMessageInput] = useState(""); // New message input state
  const [chatId, setChatId] = useState(null); // Store chatId
  const [messages, setMessages] = useState([]); // Store all messages

  // Fetch previous messages when component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `https://flatelse.onrender.com/messages/${senderId}/${recipientId}`
        );
        if (!response.ok) throw new Error("Failed to fetch messages");

        const data = await response.json();
        console.log("Fetched previous messages:", data);

        setMessages(data);
        if (data.length > 0) {
          setChatId(data[0].chatId); // Store chatId if exists
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [senderId, recipientId]);

  // Fetch and handle real-time incoming messages from WebSocket
  useEffect(() => {
    if (!stompClient) return;

    // Subscribe to the WebSocket channel for the specific chat
    const subscription = stompClient.subscribe(
      `/user/${userData.id}/queue/messages`,
      (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log("New WebSocket message received:", receivedMessage);

        // If the received message is part of the current chat, add it to the message list
        if (
          (receivedMessage.senderId === senderId &&
            receivedMessage.recipientId === recipientId) ||
          (receivedMessage.senderId === recipientId &&
            receivedMessage.recipientId === senderId)
        ) {
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
      }
    );

    return () => {
      // Unsubscribe when the component unmounts
      if (subscription) subscription.unsubscribe();
    };
  }, [stompClient, senderId, recipientId, userData.id]);

  // Send Message via WebSocket
  const handleSendMessage = () => {
    if (!stompClient || newMessageInput.trim() === "") return;

    const message = {
      senderId: userData.id,
      recipientId,
      content: newMessageInput,
      chatId: chatId || null, // Initially null, if it's a new chat
    };

    // Optimistically add the message to the UI before sending it
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        senderId: userData.id,
        recipientId,
        content: newMessageInput,
        chatId: chatId || null,
      },
    ]);

    // Send the message over WebSocket
    sendMessage(message);

    setNewMessageInput(""); // Clear input after sending
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 border rounded-lg shadow-md">
      {/* Chat Messages (Scrollable part) */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-2"
        style={{ maxHeight: "calc(100vh - 100px)" }}
      >
        {messages.map((msg, index) => {
          const isSender = String(msg.senderId) === String(userData.id);

          return (
            <div
              key={index}
              className={`flex w-full ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-sm text-sm ${
                  isSender
                    ? "bg-blue-500 text-white rounded-br-lg rounded-tl-lg"
                    : "bg-gray-300 text-gray-800 rounded-bl-lg rounded-tr-lg"
                }`}
                style={{ wordWrap: "break-word" }}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input (Fixed at the bottom) */}
      <div
        className="p-3 bg-white flex items-center border-t"
        style={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "white",
          zIndex: 10,
        }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none"
          value={newMessageInput}
          onChange={(e) => setNewMessageInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
          onClick={handleSendMessage}
        >
          <FiSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default Messages;
