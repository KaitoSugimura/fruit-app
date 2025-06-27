import express from "express";
import cors from "cors";
import { fetch } from "undici";

const app = express();
const PORT = 3001;

// Allow requests from anywhere
app.use(cors());
app.use(express.json());

app.use("/proxy", async (req: any, res: any) => {
  try {
    const response = await fetch("https://fruity-proxy.vercel.app/api/fruits", {
      method: req.method,
      headers: {
        // Spoof Origin
        origin: "https://localhost:5174",
        "x-api-key": "fruit-api-challenge-2025",
      },
      body: ["POST", "PUT", "PATCH"].includes(req.method.toUpperCase())
        ? JSON.stringify(req.body)
        : undefined,
    });

    const data = await response.text(); // use .json() if API returns JSON
    res.status(response.status).send(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
