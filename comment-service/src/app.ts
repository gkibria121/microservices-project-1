import express, { Request, Response } from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import { Comment } from "./type/app";
import axios from "axios";
const app = express();
const port = process.env.PORT || 3000;

const comments: Comment[] = [];
// Middleware
app.use(cors());
app.use(express.json());

app.post("/api/comments", (req: Request, res: Response) => {
  const { comment, postId } = req.body;

  if (!comment) {
    res.status(422).json({
      errors: {
        comment: "Comment is required",
      },
    });
    return;
  }
  if (!postId) {
    res.status(422).json({
      errors: {
        comment: "postId is required",
      },
    });
    return;
  }
  const newComment: Comment = {
    id: randomBytes(3).toString("hex"),
    postId,
    comment,
    status: "pending",
  };
  comments.push(newComment);
  res.status(200).json(newComment);
  propagateEvent("CommentCreated", newComment);
});

app.post("/api/events", (req: Request, resp: Response) => {
  const event = req.body;
  handleEvents(event);
  resp.status(200);
});

// Start server
app.listen(port, async () => {
  console.log(`🚀; Server running on http://localhost:${port}`);
  const events = await axios.get("http://event-bus:3000/api/events");
  console.log(events);
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
  const eventType = event.type;
  if (eventType === "CommentModerated") {
    propagateEvent("CommentUpdated", event.data);
  }
}
