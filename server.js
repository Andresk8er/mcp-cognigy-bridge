import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const COGNIGY_ENDPOINT = "https://endpoint-trial-us.cognigy.ai/d58090b8c74e0525edfa04b096cc5f06477a7a2a654ce6024a3f6a2182093153";

app.get("/", (req, res) => {
  res.send("MCP Cognigy Bridge running 🚀");
});

app.post("/tool", async (req, res) => {

  const userMessage = req.body.message;

  try {

    const response = await fetch(COGNIGY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: "mcp-user",
        text: userMessage
      })
    });

    const data = await response.json();

    res.json(data);

  } catch (error) {

    console.error("Cognigy Error:", error);

    res.status(500).send("Error talking to Cognigy");

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
