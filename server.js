import express from "express";
import axios from "axios";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { HttpServerTransport } from "@modelcontextprotocol/sdk/server/http.js";
import { z } from "zod";

const server = new McpServer({
  name: "cognigy-mcp-bridge",
  version: "1.0.0"
});

server.tool(
  "send_to_cognigy",
  {
    message: z.string()
  },
  async ({ message }) => {
    const response = await axios.post(
      "https://endpoint-trial.cognigy.ai/webhooks/rest/webhook",
      {
        text: message
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COGNIGY_API_KEY}`
        }
      }
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response.data)
        }
      ]
    };
  }
);

const app = express();
app.use(express.json());

const transport = new HttpServerTransport();
await server.connect(transport);

app.post("/mcp", async (req, res) => {
  await transport.handleRequest(req, res);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
