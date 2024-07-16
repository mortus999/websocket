import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { Socket } from "socket.io-client";

interface SocketProps {
    socket: Socket
}

const ChatBody = ({ socket }: SocketProps) => {
  const [messages, setMessages] = useState<{ text: string }[]>([]);

  useEffect(() => {
    // listens for a specific socket event
    // in this case our "message" 
    socket.on("message", (emittedMessage) => {
        // add emittedMessage to our messages array
        setMessages([...messages, emittedMessage])
    })
  }, [messages,socket])

  return <Container>
    {messages.map((message, index) => (
        <Card key={index}>
            <Card.Body>{message.text}</Card.Body>
        </Card>
    ))}
  </Container>;
};

export default ChatBody;