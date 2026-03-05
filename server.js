import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const API_URL = "https://trial-us.cognigy.ai";
const API_KEY = "837226bc6180f04f71f17199412933fef590a388f62362b447146b115cc5a0a583594a7bad515853b7a662bda88de53b413210302d64539a6f12f688b4dd40a2";
const FLOW_ID = "9f0a9fdb-6f40-4d49-b822-00654404c7b7";

app.get("/", (req, res) => {
  res.send("MCP Cognigy Bridge is running 🚀");
});

app.post("/tool", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(`${API_URL}/api/v2/conversations`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        flowId: FLOW_ID,
        text: userMessage,
        userId: "mcp-user"
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error talking to Cognigy");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
