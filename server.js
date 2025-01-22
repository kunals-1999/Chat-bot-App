const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Endpoint: Fetch messages
app.get("/api/messages", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM messages ORDER BY timestamp DESC");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).send("Database error");
  }
});

// API Endpoint: Send a message
app.post("/api/messages", async (req, res) => {
  const { sender, content } = req.body;
  try {
    await db.query("INSERT INTO messages (sender, content, timestamp) VALUES (?, ?, NOW())", [sender, content]);
    res.status(201).send("Message sent");
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).send("Database error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
