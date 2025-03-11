import React, { createContext, useState, useEffect } from "react";

// Default export of WebSocketContext
const WebSocketContext = createContext();

export function WebSocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket("wss://flatelse.onrender.com/ws/websocket");
      setSocket(ws);

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onmessage = (message) => {
        console.log("Received message:", message.data);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = (event) => {
        console.log("WebSocket disconnected", event.code, event.reason);

        // Retry if connection failed with error code 1006 (unexpected closure)
        if (event.code === 1006 && retries < 3) {
          console.log("Retrying WebSocket connection...");
          setRetries(retries + 1);
          setTimeout(connectWebSocket, 3000); // Retry after 3 seconds
        }
      };
    };

    connectWebSocket(); // Initial connection attempt

    // Cleanup on component unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [retries]);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export default WebSocketContext;
//okk
