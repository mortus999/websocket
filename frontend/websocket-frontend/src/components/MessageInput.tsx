import React, { FormEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Socket } from "socket.io-client";

interface SocketProps {
  socket: Socket;
}

const MessageInput = ({ socket }: SocketProps) => {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();
    //emits a "message" event
    //sends the message to our server which will be emitted to all connected clients
    socket.emit("message", { text: message });
    setMessage("");
  };

    const handleEnterKey = (event: any) => {
    // check if the key pressed was the enter key
    if(event.key === "Enter"){
        handleSendMessage(event);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSendMessage}>
        <Form.Group>
          <Form.Label>Type your message: </Form.Label>
          <Form.Control
            type="text"
            value={message}
            autoComplete="off"
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => handleEnterKey(event)}
          />
        </Form.Group>
        <Button type="submit">Send Message</Button>
      </Form>
    </Container>
  );
};

export default MessageInput;