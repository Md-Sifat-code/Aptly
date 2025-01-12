// socket.js
const socket = new WebSocket('ws://baribazar.onrender.com/ws'); // Use your WebSocket URL

// WebSocket event handlers
socket.onopen = () => {
  console.log('WebSocket connection established');
};

socket.onmessage = (event) => {
  console.log('Message from server:', event.data);
};

socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

socket.onclose = () => {
  console.log('WebSocket connection closed');
};

// Utility functions to interact with the WebSocket
const connectSocket = () => {
  return socket;
};

const sendMessage = (message) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(message); // Send message only if the connection is open
  } else {
    console.error('WebSocket is not open. Unable to send message.');
  }
};

const closeSocket = () => {
  socket.close();
};

export { connectSocket, sendMessage, closeSocket };
