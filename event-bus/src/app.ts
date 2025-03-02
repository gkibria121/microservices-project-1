import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

//routes
app.post("/api/events", (req: Request, resp: Response) => {
  console.log(req.body);
  // propagateEvent("http://comment-creation-service:3000/api/events", req.body);
  // propagateEvent("http://post-creation-service:3000/api/events", req.body);
  propagateEvent("http://query-service:3000/api/events", req.body);
  resp.status(200);
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

async function propagateEvent(url: string, event: any) {
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
}
