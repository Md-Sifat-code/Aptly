import React, { createContext, useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const WebSocketContext = createContext();

export function WebSocketProvider({ children }) {
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // Track connection state
  const [messages, setMessages] = useState([]); // Store received messages

  useEffect(() => {
    const socket = new SockJS("https://flatelse.onrender.com/ws");
    const client = Stomp.over(socket);

    client.connect(
      {},
      () => {
        console.log("Connected to WebSocket");
        setIsConnected(true); // Set connection state
        setStompClient(client);

        // Subscribe to the message topic for real-time updates
        client.subscribe("/user/queue/messages", (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log("New WebSocket message received:", receivedMessage);

          // Update state with the new message (both sender and recipient should get this)
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      },
      (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
      }
    );

    return () => {
      if (client.connected) {
        client.disconnect();
        console.log("Disconnected from WebSocket");
      }
    };
  }, []);

  const sendMessage = (message) => {
    if (stompClient && isConnected) {
      stompClient.send("/app/chat", {}, JSON.stringify(message));
    } else {
      console.warn("WebSocket not connected yet. Message not sent.");
    }
  };

  return (
    <WebSocketContext.Provider value={{ stompClient, sendMessage, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export default WebSocketContext;
