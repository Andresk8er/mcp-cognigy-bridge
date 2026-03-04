import express from "express";

const app = express();
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("MCP Cognigy Bridge is running 🚀");
});

// Example tool endpoint
app.post("/tool", async (req, res) => {
  try {
    const { message } = req.body;

    // Here you will later connect Cognigy API
    res.json({
      reply: `Received message: ${message}`
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
