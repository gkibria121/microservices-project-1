import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;
const events: EventType[] = [];

type EventType = {
  type: string;
  data: any;
};
// Middleware
app.use(cors());
app.use(express.json());

//routes
app.post("/api/events", (req: Request, resp: Response) => {
  const event = req.body as EventType;
  propagateEvent("http://comment-creation-service:3000/api/events", event);
  // propagateEvent("http://post-creation-service:3000/api/events", req.body);
  propagateEvent("http://query-service:3000/api/events", event);
  propagateEvent("http://comment-moderation-service:3000/api/events", event);
  events.push(event);
  resp.status(200);
});
app.get("/api/events", (req: Request, resp: Response) => {
  const event = req.body as EventType;

  resp.status(200).json({
    events,
  });
});
// Start server
app.listen(port, async () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

async function propagateEvent(url: string, event: EventType) {
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
  } catch (e) {}
}
