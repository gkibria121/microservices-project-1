import express, { Request, Response } from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import axios from "axios";
import { Comment, PostType } from "../type/app";
const app = express();
const port = process.env.PORT || 3000;
const posts: PostType[] = [];
const flags = ["orange"];
// Middleware
app.use(cors());
app.use(express.json());
app.post("/api/events", async (req: Request, res: Response) => {
  const event = req.body;
  handleEvents(event);
  res.status(200);
});
// Start server
app.listen(port, async () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  const {
    data: { events },
  } = await axios.get("http://event-bus:3000/api/events");
  events.forEach((event: { type: string; data: any }) => handleEvents(event));
});

async function propagateEvent(type: string, data: any) {
  try {
    await fetch(`http://event-bus:3000/api/events`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        data,
      }),
    });
  } catch (e) {
    console.log(e);
  }
}

function handleEvents(event: { type: string; data: any }) {
  if (event.type === "CommentCreated") {
    const comment = event.data as Comment;
    const updatedComment: Comment = {
      ...event.data,
      status: flags.reduce(
        (acc, flag) => (comment.comment.includes(flag) ? "rejected" : "accepted"),
        ""
      ),
    };
    propagateEvent("CommentModerated", updatedComment);
  }
}
