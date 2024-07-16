import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { io } from "socket.io-client";
import MessageInput from "./components/MessageInput";
import ChatBody from "./components/ChatBody";

// connects to our flask backend (not by default because we turned off autoConnect)
const socket = io("http://127.0.0.1:5000", {
  autoConnect: false,
});

function App() {
  // socket.connected keeps track of whether our socket is connected to the server or not
  // we will store that status in our state
  const [isConnected, setIsConnected] = useState(socket.connected);

  const handleConnect = () => {
    // attempts to connect to server
    socket.connect();
    setIsConnected(true);
  }

  const handleDisconnect = () => {
    socket.disconnect();
    setIsConnected(false);
  }

  return (
    <Container>
      <p>
        CONNECTION STATUS:{" "}
        {isConnected
          ? "Connected to Flask Server"
          : "Disconnected from Flask Server"}
      </p>
      {isConnected ? (
        <>
         <ChatBody socket={socket}/>
         <MessageInput socket={socket}/>
         <Button variant="danger" onClick={handleDisconnect}>Disconnect</Button>
        </>
      ) : (
        <Button onClick={handleConnect}>Connect</Button>
      )}
    </Container>
  );
}

export default App;