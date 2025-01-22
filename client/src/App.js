import React, { useState, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages
  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Error fetching messages:", err));
  }, []);

  // Send a message
  const sendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sender: "User", content: newMessage }),
        });
        setNewMessage("");
        // Refresh messages
        const res = await fetch("/api/messages");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Error sending message:", err);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chat App</h1>
      <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px", height: "300px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}: </strong>
            {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
        style={{ width: "70%", marginRight: "10px" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
