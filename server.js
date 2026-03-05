import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Cognigy configuration
const API_URL = "https://trial-us.cognigy.ai";
const API_KEY = "837226bc6180f04f71f17199412933fef590a388f62362b447146b115cc5a0a583594a7bad515853b7a662bda88de53b413210302d64539a6f12f688b4dd40a2";
const FLOW_ID = "9f0a9fdb-6f40-4d49-b822-00654404c7b7";

// Health check
app.get("/", (req, res) => {
  res.send("MCP Cognigy Bridge is running 🚀");
});

// Tool endpoint
app.post("/tool", async (req, res) => {
  const userMessage = req.body.message;

  try {

    const response = await fetch(`${API_URL}/api/v2/endpoint/${FLOW_ID}`, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: "mcp-user",
        text: userMessage
      })
    });

    const data = await response.json();

    res.json({
      cognigy_response: data
    });

  } catch (error) {
    console.error("Cognigy Error:", error);
    res.status(500).send("Error talking to Cognigy");
  }
});

// Render requires dynamic port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
